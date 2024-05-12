import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  status: 'idle',
  error: null
};

// Async thunk for fetching course data
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch('/data/courses.json');
  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  const data = await response.json();
  return data.courses;
});

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default coursesSlice.reducer;
