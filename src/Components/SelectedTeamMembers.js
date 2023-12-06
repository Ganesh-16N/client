// SelectedTeamMembers.js
import React from 'react';
const SelectedTeamMembers = ({ teamMembers, onRemoveFromTeam, closeShowSelectedTeamMembers }) => {

    return (
        <div className="container mx-auto p-8 bg-gray-800 text-white min-h-full ">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-semibold mb-4">Selected Team Members</h1>
                <button className=' text-white rounded bg-red-600 p-2' onClick={() => closeShowSelectedTeamMembers(false)}>close</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {teamMembers.map((member) => (
                    <div
                        key={member._id}
                        className="bg-gray-900 border border-gray-300 rounded-lg shadow-lg p-6 transition-transform hover:transform hover:scale-105 relative"
                    >

                        <div className="text-center mb-2">
                            <img src={member.avatar} alt={`${member.first_name} ${member.last_name}`} className="w-20 h-20 rounded-full mx-auto" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-1">
                                {member.first_name} {member.last_name}
                            </h3>
                            <p>Email: {member.email}</p>
                            <p>Gender: {member.gender}</p>
                            <p>Domain: {member.domain}</p>
                        </div>
                        <div className="flex justify-center mt-2">
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                onClick={() => onRemoveFromTeam(member._id)}
                            >
                                Remove from Team
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectedTeamMembers;
