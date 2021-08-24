const { Order } = require("../models");

const getAll = (pagination, filter) => {
  const { page, limit } = pagination;
  const skip = page * limit - limit;
  return Order.find(filter, "_id name", { skip, limit: +limit });
};

const add = (newOrder) => {
  return Order.create(newOrder);
};
module.exports = {
  add,
  getAll,
};
