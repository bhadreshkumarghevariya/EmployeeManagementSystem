const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  id: Number,
  FirstName: String,
  LastName: String,
  Age: String,
  DateofJoining: String,
  Title: String,
  Department: String,
  EmployeeType: String,
  CurrentStatus: String,
});
const Employee = mongoose.model("Employee", EmployeeSchema, "employees");
module.exports = Employee;
