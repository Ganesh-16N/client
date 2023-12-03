// Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../redux/userSlice';
import CreateUserForm from '../Components/CreateUserForm';
import SelectedTeamMembers from '../Components/SelectedTeamMembers';
import Navbar from '../Components/Navbar';
import UpdateUserForm from '../Components/UpdateUserForm';

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const [isCreateUserFormVisible, setCreateUserFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [showselectedTeamMembers, setshowSelectedTeamMembers] = useState(false);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filterUsers = () => {
    let filteredUsers = users.filter(
      (user) =>
        (user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!selectedDomain.toLowerCase() || user.domain.toLowerCase() === selectedDomain.toLowerCase()) &&
        (!selectedGender.toLowerCase() || user.gender.toLowerCase() === selectedGender.toLowerCase()) &&
        (selectedAvailability === null || user.available === selectedAvailability)
    );

    return filteredUsers;
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filterUsers().slice(indexOfFirstUser, indexOfLastUser);


  const handleUpdateUser = () => {
    // Fetch the user by ID and show the update form
    // handleFetchUserById(userId);
    setUpdateFormVisible(true);
  };

  const handleUpdate = (updatedUser) => {
    // Dispatch the update action and close the form
    dispatch(updateUser(updatedUser));
    setUpdateFormVisible(false);
  };

  const closeUpdateForm = () => {
    // Close the update form
    setUpdateFormVisible(false);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleAddToTeam = (user) => {
    const isUnique =
      !selectedTeamMembers.some(
        (teamMember) =>
          teamMember.domain.toLowerCase() === user.domain.toLowerCase() &&
          teamMember.available === user.available
      );

    if (isUnique) {
      setSelectedTeamMembers((prevMembers) => [...prevMembers, user]);
    }
  };

  const handleRemoveFromTeam = (userId) => {
    setSelectedTeamMembers((prevMembers) => prevMembers.filter((member) => member._id !== userId));
  };

  const toggleCreateUserForm = () => {
    setCreateUserFormVisible((prevVisible) => !prevVisible);
  };

  const closeForm = (x) => {
    setCreateUserFormVisible(x);
  };

  const closeShowSelectedTeamMembers = (x) => [
    setshowSelectedTeamMembers(x)
  ]

  return (
    <>
      {isCreateUserFormVisible && <CreateUserForm closeForm={closeForm} onClose={toggleCreateUserForm} />}
      {/* Conditionally render the selected team members */}
      {showselectedTeamMembers && (
        <SelectedTeamMembers
          closeShowSelectedTeamMembers={closeShowSelectedTeamMembers}
          teamMembers={selectedTeamMembers}
          onRemoveFromTeam={(userId) => handleRemoveFromTeam(userId)}
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
        <div className="container mx-auto bg-gray-100">
          {/* <h1 className="text-4xl font-semibold mb-4">User List</h1> */}

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


          <div className="grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 transition-transform hover:transform hover:scale-105 relative"
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
                    onClick={() =>{handleUpdateUser(); setSelectedUserForUpdate(user._id)}}
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
                    className={`bg-${selectedTeamMembers.some((member) => member._id === user._id) ? 'yellow' : 'blue'}-500 text-white px-2 py-1 rounded mt-2 hover:bg-${selectedTeamMembers.some((member) => member._id === user._id) ? 'yellow' : 'blue'}-600`}
                    onClick={() => {
                      selectedTeamMembers.some((member) => member._id === user._id)
                        ? handleRemoveFromTeam(user._id)
                        : handleAddToTeam(user);
                    }}
                  >
                    {selectedTeamMembers.some((member) => member._id === user._id) ? 'Remove from Team' : 'Add to Team'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-8 mt-4 p-8">
            <button
              className={`bg-gray-200 text-gray-700 px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
                }`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`bg-gray-200 text-gray-700 px-4 py-2 rounded ${currentPage === Math.ceil(filterUsers().length / usersPerPage)
                  ? 'cursor-not-allowed'
                  : 'hover:bg-gray-300'
                }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filterUsers().length / usersPerPage)}
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
