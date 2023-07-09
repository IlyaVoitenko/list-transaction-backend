const express = require("express");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");
const {
  registerEmployeeShema,
  loginEmployeeShema,
} = require("../../joi/employees");
const { login, register, logout } = require("../../controllers/authEmployees");

const router = express.Router();

router.post("/register", validateBody(registerEmployeeShema), register);

router.post("/login", validateBody(loginEmployeeShema), login);

router.post("/logout", authenticate, logout);

module.exports = router;
