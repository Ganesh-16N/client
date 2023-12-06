// teamSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let URL = "https://users-node.onrender.com/members"

export const addToTeam = createAsyncThunk('team/addToTeam', async (user) => {
  const response = await axios.post(URL,  {
    "_id":`${user._id}`,"first_name":`${user.first_name}`,"last_name":`${user.last_name}`,"email":`${user.email}`,"gender":`${user.gender}`,"avatar":`${user.avatar}`,"domain":`${user.domain}`,"available":false
  });

  // due to some issue the user directly giving some error so did this way
  return response.data;
});
 
export const deleteFromTeam = createAsyncThunk('team/deleteFromTeam', async (userId) => {
  const response = await axios.delete(`${URL}/${userId}`);
  return response.data;
});

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async () => {
  const response = await axios.get(URL);
  return response.data;
});

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
        state.members = state.members.filter((user) => user._id !== updatedUser.userId);
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
