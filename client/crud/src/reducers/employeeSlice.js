import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

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

export const getAllEmployee = createAsyncThunk(
  "employees/getAllEmployee",
  async () => {
    try {
      const response = await axios.get("http://localhost:3700/api/employees");
      console.log("response is", response);
      return response.data;
    } catch (error) {
      throw new Error(error.data.message);
    }
  }
);

export const deleteEmployeeById = createAsyncThunk(
  "employees/deleteById",
  async (employeeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3700/api/employees/${employeeId}`
      );
      console.log("response is1", response);
      return response.data;
    } catch (error) {
      throw new Error(error.message); // Use error.message instead of error.data.message
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
      })
      .addCase(getAllEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getAllEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Response from server:", action.payload);
        // Add a check to see if the payload has the expected data structure
        if (action.payload && action.payload._id) {
          state.employees = state.employees.filter(
            (employee) => employee._id !== action.payload._id
          );
        } else {
          console.error("Invalid payload format:", action.payload);
        }
      })
      .addCase(deleteEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
