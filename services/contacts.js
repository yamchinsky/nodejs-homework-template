const { Contact } = require("../models");

// const getAll = () => {
//   return Contact.find({});
// };

const add = (newContact) => {
  return Contact.create(newContact);
};

module.exports = {
  add,
  // getAll,
};
