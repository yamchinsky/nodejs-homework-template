const express = require("express");

const { validation, authenticate } = require("../middleware");
const {
  order: { joiSchema },
} = require("../models/schemas");
const { orders: ctrl } = require("../controllers");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.post("/", authenticate, validation(joiSchema), ctrl.add);

module.exports = router;
