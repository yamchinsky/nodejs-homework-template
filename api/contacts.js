const express = require("express");

const { ctrlWrapper } = require("../helpers");

const { contacts: ctrl } = require("../controllers");

const { joiSchema } = require("../models/schemas/contact");

const { validation, authenticate } = require("../middleware");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validation(joiSchema), ctrl.add);

router.put("/:id", ctrlWrapper, ctrl.update);

// router.delete("/:id", authenticate, ctrlWrapper (ctrl.del));

module.exports = router;
