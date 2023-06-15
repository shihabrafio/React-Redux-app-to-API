// src/store/users/usersSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/users'
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (thunk) => {
  try {
    // Fetch your data here and return it
    const response = await axios(URL);
    return response.data;
  } catch (error) {
    // Handle the error by rejecting with a value
    return thunk.rejectWithValue(error.message);
  }
});


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});


export const { actions } = usersSlice;
export default usersSlice.reducer;
