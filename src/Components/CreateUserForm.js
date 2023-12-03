// CreateUserForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/userSlice';

function CreateUserForm({ closeForm }) {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    domain: '', // Added the domain field
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(newUser));
    setNewUser({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      domain: '', // Reset domain field
    });
    // Close the form after submission
    closeForm(false);
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={newUser.first_name}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border border-gray-300 bg-gray-50"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={newUser.last_name}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border border-gray-300 bg-gray-50"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full rounded-md border border-gray-300 bg-gray-50"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={newUser.gender}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full rounded-md border border-gray-300 bg-gray-50"
            required
          />
        </div>
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
            Domain
          </label>
          <select
            id="domain"
            name="domain"
            value={newUser.domain}
            onChange={handleInputChange}
            className="form-select mt-1 block w-full rounded-md border border-gray-300 bg-gray-50"
            required
          >
            <option value="" disabled>Select a domain</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Business Development">Business Development</option>
            <option value="IT">IT</option>
            <option value="UI Designing">UI Designing</option>
            {/* Add other domain options as needed */}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create User
          </button>
          <button
            type="button"
            onClick={() => closeForm(false)}
            className="ml-2 text-gray-700 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
