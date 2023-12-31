const express = require("express");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");
const {
  addClient,
  getAllClients,
  findClient,
} = require("../../controllers/clients");
const { shemaAddClient } = require("../../joi/clients");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllClients);

router.post("/", validateBody(shemaAddClient), addClient);

router.get("/:numberPhone", findClient);

module.exports = router;
