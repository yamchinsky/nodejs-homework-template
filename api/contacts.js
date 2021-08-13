const express = require("express");
const { validateContact } = require("../middleware");
const { contacts: ctrl } = require("../controllers");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateContact, ctrl.add);

router.put("/:id", validateContact, ctrl.update);

router.delete("/:id", ctrl.del);

module.exports = router;
