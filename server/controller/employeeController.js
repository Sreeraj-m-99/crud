const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    console.log("employee data is", employeeData);
    const employee = Employee(employeeData);
    await employee.save();
    console.log(employee);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: "invalid request" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    console.log("params is", req.params.id);
    const id = req.params.id.trim();
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    if (!employee) {
      return res.status(400).json({ error: "invalid user id " });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(400).json({ error: "invalid user" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployee,
};
