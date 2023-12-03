// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;



// <UserCard
//           key={user._id}
//           user={user}
//           onUpdate={handleUpdateUser}
//           onDelete={handleDeleteUser}
//           onFetchUserById={handleFetchUserById}
//         />