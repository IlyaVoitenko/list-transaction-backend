const Joi = require("joi");

const registerEmployeeShema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});
const loginEmployeeShema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
module.exports = { registerEmployeeShema, loginEmployeeShema };
