const { model, Schema } = require("mongoose");

const { handleMongooseError } = require("../../utils");

const shemaClients = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    numberPhone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      require: true,
    },
    avavarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
shemaClients.post("save", handleMongooseError);

const Client = model("clients", shemaClients);

module.exports = Client;
