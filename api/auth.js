const express = require("express");

const { validation, authenticate, uploadMiddleware } = require("../middleware");
const {
  user: { joiSchema },
} = require("../models/schemas");
const { auth: ctrl } = require("../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrl.signup);

router.get("./verify/:verifyToken", ctrl.verifyEmail); //запрос на считывание токена, при переходе юзера по ссылке в пиьсме

router.post("/signin", ctrl.signin);

router.get("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  uploadMiddleware.single("avatar"),
  ctrl.uploadAvatar
);

module.exports = router;
