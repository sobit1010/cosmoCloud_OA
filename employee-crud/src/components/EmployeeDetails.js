
// First

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Employee ID:</strong> {employee._id}</p>
              

      <p><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
      <p><strong>Contact Methods:</strong></p>
      <ul>
        {employee.contacts.map((contact, index) => (
          <li key={index}>{contact.contact_method}: {contact.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDetails;
