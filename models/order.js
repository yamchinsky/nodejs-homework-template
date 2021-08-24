const { model } = require("mongoose");

const { order } = require("./schemas");
const { orderSchema } = order;

const Order = model("order", orderSchema);

module.exports = Order;
