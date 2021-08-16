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

const updateById = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
