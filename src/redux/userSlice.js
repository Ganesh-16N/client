// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ page, searchTerm, gender, domain, available}) => {
  try {
    const response = await axios.get(`https://users-node.onrender.com/api/users`, {
      params: {
        page,
        searchTerm,
        gender,
        domain,
        available
      },
    });

    return response.data.data;
  } catch (error) {
    alert('Error fetching users:', error.message);
    throw error; 
  }
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
  console.log(JSON.stringify(user))
  const response = await axios.post("https://users-node.onrender.com/api/users", {
    "id":1001,"first_name":`${user.first_name}`,"last_name":`${user.last_name}`,"email":`${user.email}`,"gender":`${user.gender}`,"avatar":"https://robohash.org/sintessequaerat.png?size=50x50&set=set1","domain":`${user.domain}`,"available":false,"is_team_member":false
  })
  return response.data;
});


export const updateUser = createAsyncThunk('users/updateUser', async (user, bool) => {
  const response = await axios.put(`${"https://users-node.onrender.com/api/users"}/${user._id}`, {
    "id":`${user.id}`,"first_name":`${user.first_name}`,"last_name":`${user.last_name}`,"email":`${user.email}`,"gender":`${user.gender}`,"avatar":`${user.avatar}`,"domain":`${user.domain}`,"available":false,"is_team_member":`${bool}`
  });
  return response.data;
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`${"https://users-node.onrender.com/api/users"}/${userId}`);
  return userId;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  const response = await axios.get(`${"https://users-node.onrender.com/api/users"}/${userId}`);
  return response.data;
});

// Create the slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.list.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.list[index] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.list = state.list.filter((user) => user.id !== userId);
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [action.payload];
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default userSlice.reducer;
