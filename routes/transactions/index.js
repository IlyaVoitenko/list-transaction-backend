const express = require("express");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");
const { addTransactonShema } = require("../../joi/transactions");
const {
  getClientTransactions,
  getAllTransactions,
  addTransaction,
} = require("../../controllers/transactions");

const router = express.Router();

router.use(authenticate);

router.post(
  "/:numberPhoneClient",
  validateBody(addTransactonShema),
  addTransaction
);

router.get("/", getAllTransactions);

router.get("/client/:numberPhoneClient", getClientTransactions);

module.exports = router;
