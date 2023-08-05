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

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getEmployeeByID = createAsyncThunk(
  "employees/getEmployeeByID",
  async (employeeId) => {
    try {
      const response = await axios.get(
        `http://localhost:3700/api/employees/${employeeId}`
      );
      console.log("response for get employee by id", response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateEmployeeById = createAsyncThunk(
  "employees/updateEmployeeById",
  async ({values,employeeId}) => {
    try {
      const response = await axios.put(
        `http://localhost:3700/api/employees/${employeeId}`,values
      );
      console.log("response for update employees by id", response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
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
      })
      .addCase(getEmployeeByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeByID.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployeeByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEmployeeById.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(updateEmployeeById.fulfilled,(state,action)=>{
        state.loading=false
        state.employees=action.payload
      })
      .addCase(updateEmployeeById.rejected,(state,action)=>{
        state.loading=false
        state.error=action.error.message
      })
  },
});

export default employeeSlice.reducer;
