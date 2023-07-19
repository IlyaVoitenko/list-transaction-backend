const { HttpError } = require("../helpers");
const gravatar = require("gravatar");

const { ctrlWrapper } = require("../utils");

const Clients = require("../models/clients");

const getAllClients = async (_, res) => {
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
  const avatar = gravatar.url(email, { default: "mp" });

  const newClient = await Clients.create({ ...req.body, avatarUrl: avatar });
  res.status(201).json({ newClient });
};

const findClient = async (req, res) => {
  const { numberPhone } = req.params;
  const client = await Clients.findOne({ numberPhone });
  if (!client) throw HttpError(404);
  res.status(200).json({ client });
};
module.exports = {
  getAllClients: ctrlWrapper(getAllClients),
  addClient: ctrlWrapper(addClient),
  findClient: ctrlWrapper(findClient),
};
