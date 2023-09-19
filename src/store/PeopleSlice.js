import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PEOPLE_URL = "http://localhost:8000/api/person/kisiler";

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople', 
  async () => {
    const response = await axios.get(PEOPLE_URL);
    return response.data;
  }
);

export const addPerson = createAsyncThunk(
  'people/addPerson', 
  async (data) => {
    const response = await axios.post(PEOPLE_URL, data);
    return response.data;
  }
);

export const updatePerson = createAsyncThunk(
  'people/updatePerson', 
  async ({ id, data }) => {
    console.log(id)
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Güncellenecek veriler eksik veya boş.");
    }

    const response = await axios.put(`${PEOPLE_URL}/${id}`, data);
    console.log(response)
    return response.data;
  }
);

export const deletePerson = createAsyncThunk(
  'people/deletePerson',
  async ({id}) => {
    console.log(id)
    await axios.delete(`${PEOPLE_URL}/${id}`);
    return id;
  }
)


const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    status: "idle",
    error: null
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
      })
      .addCase(addPerson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = [...state.people, action.payload];
      })
      .addCase(addPerson.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePerson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = state.people.map((person) => {
          if (person.id === action.payload.id) {
            return action.payload;
          }
          return person;
        });
      })
      .addCase(updatePerson.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePerson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedPersonId = action.payload;
        state.people = state.people.filter((person) => person.id !== deletedPersonId);
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPeople = (state) => state.people.people;
export const getPeopleStatus = (state) => state.people.status;
export const getPeopleError = (state) => state.people.error;

export default peopleSlice.reducer;
