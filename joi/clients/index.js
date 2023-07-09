const Joi = require("joi");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const RegexChars = /^[A-Za-z\s]+$/;
const phoneNumberRegex = /^\+\d{1,3}\d{9}$/;

const shemaAddClient = Joi.object({
  name: Joi.string().pattern(RegexChars).required(),
  surname: Joi.string().pattern(RegexChars).required(),
  numberPhone: Joi.string().pattern(phoneNumberRegex).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().required(),
  country: Joi.string().pattern(RegexChars).required(),
  avavarUrl: Joi.string(),
});

module.exports = { shemaAddClient };
