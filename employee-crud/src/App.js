
// first

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployeeForm from './components/AddEmployeeForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Employee List</Link></li>
            <li><Link to="/add">Add Employee</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add" element={<AddEmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
