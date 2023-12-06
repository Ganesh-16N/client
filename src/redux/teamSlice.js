// teamSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let URL = "localhost:3000/members"
// Async Thunk for adding a user to the team
export const addToTeam = createAsyncThunk('team/addToTeam', async (user) => {
  const response = await axios.put(URL,  {
    "_id":`${user._id}`,"first_name":`${user.first_name}`,"last_name":`${user.last_name}`,"email":`${user.email}`,"gender":`${user.gender}`,"avatar":"https://robohash.org/sintessequaerat.png?size=50x50&set=set1","domain":`${user.domain}`,"available":false
  });
  return response.data;
});

// Async Thunk for deleting a user from the team
export const deleteFromTeam = createAsyncThunk('team/deleteFromTeam', async (userId) => {
  const response = await axios.put(`${URL}/${userId}`, {
    is_team_member: false,
  });
  return response.data;
});

// Async Thunk for fetching all team members
export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async () => {
  const response = await axios.get(URL);
  return response.data;
});

// Create the slice
const teamSlice = createSlice({
  name: 'team',
  initialState: {
    members: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToTeam.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.members.push(updatedUser);
      })
      .addCase(deleteFromTeam.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.members = state.members.filter((user) => user.id !== updatedUser.id);
      })
      .addCase(fetchTeamMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;
