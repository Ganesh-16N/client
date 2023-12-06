// Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../redux/userSlice';
import CreateUserForm from '../Components/CreateUserForm';
import SelectedTeamMembers from '../Components/SelectedTeamMembers';
import Navbar from '../Components/Navbar';
import UpdateUserForm from '../Components/UpdateUserForm';
import { addToTeam, deleteFromTeam, fetchTeamMembers } from '../redux/teamSlice';

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const selectedTeamMembers = useSelector((state) => state.team.members);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const [isCreateUserFormVisible, setCreateUserFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [showselectedTeamMembers, setshowSelectedTeamMembers] = useState(false);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, searchTerm: searchQuery, gender : selectedGender , domain : selectedDomain, available : selectedAvailability }));
    dispatch(fetchTeamMembers());
  }, [currentPage, selectedTeamMembers, dispatch, searchQuery, selectedGender, selectedAvailability, selectedDomain]);

  const handleUpdateUser = () => {
    setUpdateFormVisible(true);
  };

  const handleUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    setUpdateFormVisible(false);
  };

  const closeUpdateForm = () => {
    setUpdateFormVisible(false);
  };

  const handleDeleteUser = (userId) => {
   if( selectedTeamMembers.find(x => x._id === userId))
    { dispatch(deleteFromTeam(userId)) }
    dispatch(deleteUser(userId));
  };

  const handleAddToTeam = (user) => {
    dispatch(addToTeam(user));
  };

  const handleRemoveFromTeam = (userId) => {
    dispatch(deleteFromTeam(userId));
  };

  const toggleCreateUserForm = () => {
    setCreateUserFormVisible((prevVisible) => !prevVisible);
  };

  const closeForm = () => {
    setCreateUserFormVisible(false);
  };

  const closeShowSelectedTeamMembers = () => {
    setshowSelectedTeamMembers(false);
  };

 
  return (
    <>
      {isCreateUserFormVisible && <CreateUserForm closeForm={closeForm} onClose={toggleCreateUserForm} />}
      {showselectedTeamMembers && (
        <SelectedTeamMembers
          closeShowSelectedTeamMembers={closeShowSelectedTeamMembers}
          teamMembers={selectedTeamMembers}
          onRemoveFromTeam={handleRemoveFromTeam}
        />
      )}

      {isUpdateFormVisible && (
        <UpdateUserForm
          user={selectedUserForUpdate}
          onUpdate={handleUpdate}
          onClose={closeUpdateForm}
        />
      )}

      {!isCreateUserFormVisible && !isUpdateFormVisible && !showselectedTeamMembers && (
        <div className="container mx-auto bg-black">
          <Navbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDomain={selectedDomain}
            onDomainChange={setSelectedDomain}
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
            selectedAvailability={selectedAvailability}
            onAvailabilityChange={setSelectedAvailability}
            onCreateUserClick={toggleCreateUserForm}
            onShowTeamMembersClick={() => setshowSelectedTeamMembers(true)}
            selectedTeamMembers={selectedTeamMembers}
          />

          <div className=" bg-gray-900 grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className=" bg-slate-950 text-white border border-gray-600 rounded-lg shadow-lg p-6 transition-transform hover:transform hover:scale-105 relative"
              >
                <div className={`h-3 w-3 rounded-full availability-indicator ${user.available ? 'bg-green-500' : 'bg-red-500'}`} />
                <div className="text-center mb-2">
                  <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full mx-auto" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p>Email: {user.email}</p>
                  <p>Gender: {user.gender}</p>
                  <p>Domain: {user.domain}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() =>{handleUpdateUser(); setSelectedUserForUpdate(user)}}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`bg-${selectedTeamMembers.find(x => x._id === user._id) ? 'blue' : 'blue'}-500 text-white px-2 py-1 rounded mt-2 hover:bg-${selectedTeamMembers.some((member) => member._id === user._id) ? 'yellow' : 'blue'}-600`}
                    onClick={() => {
                      selectedTeamMembers.find(x => x._id === user._id)
                        ? handleRemoveFromTeam(user._id)
                        : handleAddToTeam(user);
                    }}
                  >
                    {selectedTeamMembers.find(x => x._id === user._id) ? 'Remove' : 'Add to Team'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-8 mt-4 p-8">
            <button
              className={`bg-gradient-to-r from-gray-500 to-gray-700 text-gray-100 px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
                }`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`bg-gradient-to-r from-gray-500 to-gray-700 text-gray-100 px-4 py-2 rounded ${currentPage === Math.ceil(1000 / usersPerPage)
                  ? 'cursor-not-allowed'
                  : 'hover:bg-gray-300'
                }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(1000 / usersPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
