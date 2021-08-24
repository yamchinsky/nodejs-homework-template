const { orders: service } = require("../../services");

const add = async (req, res, next) => {
  try {
    const newOrder = { ...req.body, owner: req.user._id };
    const result = await service.add(newOrder);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
