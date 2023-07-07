const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../utils");

const employeeRoles = ["manager", "operator", "admin"];

const shemaEmployees = new Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: employeeRoles,
    require: true,
  },
  token: { type: String, require: true, default: "" },
});
shemaEmployees.post("save", handleMongooseError);

const Employees = model("employees", shemaEmployees);

module.exports = Employees;
