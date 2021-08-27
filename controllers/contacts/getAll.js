const { contacts: service } = require("../../services");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = { owner: req.user._id };
    const result = await service.getAll({ page, limit }, filter);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
