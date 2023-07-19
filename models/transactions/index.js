const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../utils");

const shemaTransactions = new Schema(
  {
    dateReceiving: {
      type: Date,
      default: "",
    },
    isGot: {
      type: Boolean,
      default: false,
    },
    fromPlace: {
      type: String,
      require: true,
    },
    toPlace: {
      type: String,
      require: true,
    },
    addressee: {
      type: String,
      require: true,
    },
    sender: {
      type: String,
      require: true,
    },
    summa: {
      type: String,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "clients",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

shemaTransactions.post("save", handleMongooseError);

const Trans = model("transactions", shemaTransactions);

module.exports = Trans;
