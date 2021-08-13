const { v4 } = require("uuid");

const contacts = require("../../data/contacts");

const add = (req, res) => {
  const newContact = { ...req.body, _id: v4() };
  contacts.push(newContact);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};
module.exports = add;
