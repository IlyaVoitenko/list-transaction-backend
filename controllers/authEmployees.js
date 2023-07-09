const bcrypt = require("bcrypt");

const Employees = require("../models/employees");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { login, password } = req.body;
  const employee = await Employees.findOne({ login });
  if (employee) throw HttpError(409, "the employee is alredy exist");

  const hashPassword = await bcrypt.hash(password, 10);

  const employees = await Employees.create({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({
    employee: {
      login: employees.login,
      password: employees.password,
      role: employees.role,
    },
  });
};

const login = async (req, res) => {
  const { login, password } = req.body;
  const employee = await Employees.findOne({ login });
  if (!employee) throw HttpError(401);

  const passwordCompare = await bcrypt.compare(password, employee.password);
  if (!passwordCompare) throw HttpError(401);

  const { _id: id } = employee;

  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await Employees.findByIdAndUpdate(id, { token });

  req.employee = employee;
  res.status(201).json({
    employee: {
      id: employee.id,
      token: token,
      role: employee.role,
      login: employee.login,
      password: employee.password,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.employee;

  await Employees.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
