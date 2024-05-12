import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for the slice
const initialState = {
    students: [],        // This will hold the list of students
    status: 'idle',      // Reflects the status of fetching data ('idle', 'loading', 'succeeded', 'failed')
    error: null          // Store error messages in case of a failure
  };

// Create an asynchronous thunk action for fetching students from a local JSON file
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await fetch('/data/students.json'); // Make an HTTP GET request to the specified URL
    if (!response.ok) {   // Check if the response was successful (status in the range 200-299)
      throw new Error(`Network response was not ok, status: ${response.status}`); // Throw an error if not successful
    }
    const data = await response.json(); // Parse the JSON in the response
    return data.students; // Return the list of students from the parsed JSON
  });
  
  

// Create a slice of the state with 'createSlice' function
export const studentsSlice = createSlice({
    name: 'student',     // Name of this slice of state
    initialState,        // Initial state for this slice
    reducers: {},        // Reducers for handling synchronous updates to the state
    extraReducers: (builder) => {  // Handle actions defined outside the slice (like asynchronous thunks)
      builder
        .addCase(fetchStudents.pending, (state) => {
          state.status = 'loading'; // Set status to loading when fetch begins
        })
        .addCase(fetchStudents.fulfilled, (state, action) => {
          state.status = 'succeeded';  // Set status to succeeded upon successful fetch
          state.students = action.payload; // Set the students array to the fetched data
        })
        .addCase(fetchStudents.rejected, (state, action) => {
          state.status = 'failed'; // Set status to failed if the fetch fails
          state.error = action.error.message; // Store the error message from the exception
        });
    }
  });
  
  // Export the reducer function created by the slice
  export default studentsSlice.reducer;
