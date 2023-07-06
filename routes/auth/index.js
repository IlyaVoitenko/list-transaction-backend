const express = require("express");
const { validateBody } = require("../../utils");
const router = express.Router();

router.post("/register", validateBody());

module.exports = router;
