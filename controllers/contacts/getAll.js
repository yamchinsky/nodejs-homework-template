const contacts = require("../../data/contacts");

const getAll = (req, res) => {
  if (!contacts) {
    return res.status(500).json({
      status: "fail",
      code: 500,
      message: "Server error",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
