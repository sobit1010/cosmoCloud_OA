
// First

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployeeForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zip: ''
  });
  const [contacts, setContacts] = useState([{ contact_method: 'EMAIL', value: '' }]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      name,
      address,
      contacts
    };
    try {
      await axios.post('http://localhost:5000/api/employees', employeeData);
      navigate('/');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const addContactMethod = () => {
    setContacts([...contacts, { contact_method: 'EMAIL', value: '' }]);
  };

  return (
    <div className="container add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: <span className="required">*</span></label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address Line 1: <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Line 1"
            value={address.line1}
            onChange={e => setAddress({ ...address, line1: e.target.value })}
            required
          />
        </div>
        <div>
          <label>City: <span className="required">*</span></label>
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={e => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Country: <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={e => setAddress({ ...address, country: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Zip Code: <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Zip Code"
            value={address.zip}
            onChange={e => setAddress({ ...address, zip: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Contact Methods: <span className="required">*</span></label>
          {contacts.map((contact, index) => (
            <div key={index}>
              <select
                value={contact.contact_method}
                onChange={e => handleContactChange(index, 'contact_method', e.target.value)}
              >
                <option value="EMAIL">EMAIL</option>
                <option value="PHONE">PHONE</option>
              </select>
              <input
                type="text"
                value={contact.value}
                onChange={e => handleContactChange(index, 'value', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addContactMethod}>Add Contact Method</button>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
