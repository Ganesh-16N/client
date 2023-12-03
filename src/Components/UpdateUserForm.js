// UpdateUserForm.js
import React, { useState, useEffect } from 'react';

function UpdateUserForm({ user, onUpdate, onClose }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    setUpdatedUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedUser);
    onClose(false);
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={updatedUser.first_name}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={updatedUser.last_name}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={updatedUser.gender}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
            Domain
          </label>
          <select
            id="domain"
            name="domain"
            value={updatedUser.domain}
            onChange={handleChange}
            className="form-select mt-1 block w-full rounded-md border-gray-300 bg-gray-100"
            required
          >
            <option value="">Select a domain</option>
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
            Update User
          </button>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="ml-2 text-gray-700 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;
