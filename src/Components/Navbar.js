// Navbar.js
import React from 'react';

function Navbar({
  searchQuery,
  onSearchChange,
  selectedDomain, 
  onDomainChange,
  selectedGender,
  onGenderChange,
  selectedAvailability,
  onAvailabilityChange,
  onCreateUserClick,
  onShowTeamMembersClick,
  selectedTeamMembers,
}) {

  
  return (
    <div className="bg-gray-800 p-4 mb-4 flex flex-col md:flex-row items-center justify-between">
<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
  <input
    type="text"
    placeholder="Search by Name, Email, or Gender"
    value={searchQuery}
    onChange={(e) => onSearchChange(e.target.value)}
    className="w-full md:w-auto px-4 py-2 border border-gray-400 rounded focus:outline-none text-white bg-gray-800"
  />

  <div className="flex items-center space-x-4 bg-gray-800">
    <label className="flex items-center">
      <p className='text-white'>Domain:</p>
      <select
        value={selectedDomain || ''}
        onChange={(e) => onDomainChange(e.target.value || '')}
        className="ml-2 px-2 py-1 border bg-gray-900 border-gray-400 rounded focus:outline-none text-white"
      >
        <option value="" >All</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Business Development">Business Development</option>
        <option value="IT">IT</option>
        <option value="UI Designing">UI Designing</option>
      </select>
    </label>

    <label className="flex items-center">
      <p className='text-white'>Gender:</p>
      <select
        value={selectedGender || ''}
        onChange={(e) => onGenderChange(e.target.value || '')}
        className="ml-2 px-2 py-1 border bg-gray-900 border-gray-400 rounded focus:outline-none text-white"
      >
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Polygender">Polygender</option>
        <option value="Other">Other</option>
      </select>
    </label>

    <label className="flex items-center">
      <p className='text-white'>Availability:</p>
      <select
        value={selectedAvailability || ''}
        onChange={(e) =>
          onAvailabilityChange(e.target.value || null)
        }
        className="ml-2 px-2 py-1 border bg-gray-900 border-gray-400 rounded focus:outline-none text-white"
      >
        <option value={''}>All</option>
        <option value={true}>Available</option>
        <option value={false}>Not Available</option>
      </select>
    </label>
  </div>
</div>
 
 
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none"
          onClick={onCreateUserClick}
        >
          Create New
        </button>

        <button
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-8 py-2 rounded-md hover:opacity-90 focus:outline-none relative"
          onClick={onShowTeamMembersClick}
        >
          Team
          {selectedTeamMembers.length > 0 && (
            <span className="absolute top-0 left-0 bg-red-600 text-white rounded-full p-1 text-xs">
              {selectedTeamMembers.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
