import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios'


const initialState = {
  employees: [],
  loading: false,
  error: null,
};
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData) => {
    try {
      const response = await axios.post(
        "http://localhost:3700/api/employees",
        employeeData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default employeeSlice.reducer;
