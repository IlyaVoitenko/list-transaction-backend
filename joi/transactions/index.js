const Joi = require("joi");

const addTransactonShema = Joi.object({
  addressee: Joi.string().required(),
  summa: Joi.string().required(),
  sender: Joi.string().required(),
  toPlace: Joi.string().required(),
  fromPlace: Joi.string().required(),
});

module.exports = { addTransactonShema };
