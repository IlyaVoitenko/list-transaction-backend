const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const Trans = require("../models/transactions");
const Clients = require("../models/clients");

const getAllTransactions = async (req, res) => {
  const trans = await Trans.find();
  if (!trans) throw HttpError(404);
  res.json({ trans });
};
const getClientTransactions = async (req, res) => {
  const { numberPhoneClient } = req.params;
  const client = await Clients.findOne({ numberPhone: numberPhoneClient });
  if (!client) throw HttpError(404);
  const { _id: owner } = client;
  const clientTransactions = await Trans.find({ owner });
  if (!clientTransactions) throw HttpError(404);

  res.json({ clientTransactions });
};
const addTransaction = async (req, res) => {
  const { numberPhoneClient } = req.params;
  console.log(numberPhoneClient);
  const client = await Clients.findOne({ numberPhone: numberPhoneClient });
  if (!client) throw HttpError(404);
  const { _id: owner } = client;

  const newTransacton = await Trans.create({ ...req.body, owner });
  if (!newTransacton) throw HttpError(400);
  res.json({ newTransacton });
};
const getDetailTransaction = async (req, res) => {
  const { id: _id } = req.params;
  const transaction = await Trans.findOne({ _id });
  if (!transaction) throw HttpError(404);
  res.json({ transaction });
};
module.exports = {
  addTransaction: ctrlWrapper(addTransaction),
  getAllTransactions: ctrlWrapper(getAllTransactions),
  getDetailTransaction: ctrlWrapper(getDetailTransaction),
  getClientTransactions: ctrlWrapper(getClientTransactions),
};
