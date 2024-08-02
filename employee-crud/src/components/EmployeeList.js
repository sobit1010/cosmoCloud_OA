
// First

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No Employees in the system.</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li className='parent' key={employee._id}>
              {employee.name} 
                {/* ({employee._id}) */}
              <Link id='child' to={`/employee/${employee._id}`}>View Details</Link> 
              <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
