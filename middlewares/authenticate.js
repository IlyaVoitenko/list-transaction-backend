const jwt = require("jsonwebtoken");
const Employees = require("../models/employees");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.sign(token, SECRET_KEY);
    const employee = await Employees.findById(id);
    if (!employee) next(HttpError(401));
    req.employee = employee;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
