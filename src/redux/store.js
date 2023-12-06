// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import teamReducer from './teamSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    team : teamReducer,
  },
});

export default store; 


