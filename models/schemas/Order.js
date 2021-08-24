const { Schema } = require("mongoose");
const Joi = require("joi");

const orderSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  orderSchema,
  joiSchema,
};
