// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './studentsSlice';
import coursesReducer from './coursesSlice';

const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer
  },
});

export default store;
