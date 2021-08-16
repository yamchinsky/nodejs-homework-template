const contacts = require("../../data/contacts");

const getById = (req, res) => {
  const { id } = req.params;
  const result = contacts.find((item) => item._id === id);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getById;
