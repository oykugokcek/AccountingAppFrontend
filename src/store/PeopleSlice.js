import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PEOPLE_URL = "http://localhost:8000/api/person/kisiler";

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople', 
  async () => {
    const response = await axios.get(PEOPLE_URL);
    console.log(response)
    return response.data;
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    status: "idle",
    error: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPeople = (state) => state.people.people;
export const getPeopleStatus = (state) => state.people.status;
export const getPeopleError = (state) => state.people.error;


export default peopleSlice.reducer;
