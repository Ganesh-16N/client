// UserCard.js
import React from 'react';

const UserCard = ({ user, onUpdate, onDelete, onFetchUserById }) => (
  <div className="user-card bg-white border border-gray-300 rounded-md shadow-md p-4 mb-4 transition-transform hover:transform hover:scale-105">
    <div className="user-card-header text-center mb-4">
      <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mx-auto" />
    </div>
    <div className="user-card-body">
      <h3 className="text-lg font-semibold mb-2">{user.first_name} {user.last_name}</h3>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p> 
      <p>Availability: {user.available ? 'Available' : 'Not Available'}</p>
      {/* Add more user details as needed */}
    </div>
    <div className="user-card-footer flex justify-between mt-4">
      <button className='action-btn bg-green-500 text-white hover:bg-green-600' onClick={() => onUpdate(user)}>Update</button>
      <button className='action-btn bg-red-500 text-white hover:bg-red-600' onClick={() => onDelete(user._id)}>Delete</button>
      <button className='action-btn bg-blue-500 text-white hover:bg-blue-600' onClick={() => onFetchUserById(user._id)}>Fetch user by ID</button>
    </div>
  </div>
);

export default UserCard;
