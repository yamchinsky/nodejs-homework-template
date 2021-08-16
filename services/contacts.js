const { Contact } = require("../models");

const getAll = () => {
  return Contact.find({}, "_id name email phone");
};

const getById = (id) => {
  Contact.findOne({ _id: id });
  return Contact.findById(id);
};

const add = (newContact) => {
  return Contact.create(newContact);
};

module.exports = {
  add,
  getAll,
  getById,
};
