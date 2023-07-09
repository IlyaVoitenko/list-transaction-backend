const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");

const Clients = require("../models/clients");

const getAllClients = async (req, res) => {
  const listClients = await Clients.find();
  if (!listClients) throw HttpError(404);

  res.json({
    listClients,
  });
};

const addClient = async (req, res) => {
  const { numberPhone } = req.body;
  const client = await Clients.findOne({ numberPhone });
  if (client) {
    throw HttpError(409, " client is alredy exist");
  }

  const newClient = await Clients.create({ ...req.body });
  res.status(201).json({ newClient });
};

module.exports = {
  getAllClients: ctrlWrapper(getAllClients),
  addClient: ctrlWrapper(addClient),
};
