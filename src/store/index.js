import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './PeopleSlice';


export const store = configureStore({
    reducer: {
      people: peopleReducer
    },
  })