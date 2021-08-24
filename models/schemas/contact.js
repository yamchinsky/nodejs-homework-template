const { Schema } = require("mongoose");
const Joi = require("joi");

const emailSchema = require("./email");

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Name must exist!"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegexp,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator(value) {
    //     return /\d{3}-\d{3}-\d{4}/.test(value);
    //   },
    //   message: (props) => `${props.value} is not a valid phone`,
    // },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const joiSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().pattern(new RegExp(emailRegexp)),
  phone: Joi.string().required(),
});

module.exports = { contactSchema, joiSchema };
