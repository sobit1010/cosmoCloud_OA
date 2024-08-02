const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const path=require("path");
require('dotenv').config({path: path.resolve(__dirname, '.env')}) ;

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
   }).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  emp_id: String,
  address: {
    line1: String,
    city: String,
    country: String,
    zip: String
  },
  contacts: [
    {
      contact_method: { type: String, enum: ['EMAIL', 'PHONE'] },
      value:String
    }
  ]
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get employee by id
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const employeeData = req.body;
    const employee = new Employee(employeeData);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
