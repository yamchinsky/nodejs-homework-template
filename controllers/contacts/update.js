const contacts = require("../../data/contacts");

const update = (req, res) => {
  const { id } = req.params;

  const idx = contacts.findIndex(({ _id }) => _id === id);
  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  const updateContact = { ...req.body, _id: id };
  contacts[idx] = updateContact;
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updateContact,
    },
  });
};

module.exports = update;
