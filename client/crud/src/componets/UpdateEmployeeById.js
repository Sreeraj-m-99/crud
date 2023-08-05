import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { getAllEmployee, updateEmployeeById } from "../reducers/employeeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledHelperText = styled("div")({
  color: "red",
  fontSize: "12px",
});

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(18, "Must be at least 18 years old")
    .max(100, "Age must be less than 100")
    .required("Age is required"),
  designation: Yup.string().required("Designation is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .min(0, "Salary cannot be negative")
    .required("Salary is required"),
});

const UpdateEmployeeById = React.memo(({ employee })  => {
  const dispatch=useDispatch()

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        age: employee.age || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("values are", values);
        try{
         const actionResult=await dispatch(updateEmployeeById({values:values,employeeId:employee._id}))
         const response= unwrapResult(actionResult)
         console.log("response of update employee is",response)
         dispatch(getAllEmployee())
        }catch(error){
          console.error("error message",error)
        }
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container sx={style} spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={
                touched.name && errors.name ? (
                  <StyledHelperText>{errors.name}</StyledHelperText>
                ) : (
                  ""
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={
                touched.email && errors.email ? (
                  <StyledHelperText>{errors.email}</StyledHelperText>
                ) : (
                  ""
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              name="phone"
              onChange={handleChange}
              value={values.phone}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              helperText={
                touched.phone && errors.phone ? (
                  <StyledHelperText>{errors.phone}</StyledHelperText>
                ) : (
                  ""
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="age"
              variant="outlined"
              name="age"
              onChange={handleChange}
              value={values.age}
              onBlur={handleBlur}
              error={touched.age && Boolean(errors.age)}
              helperText={
                touched.age && errors.age ? (
                  <StyledHelperText>{errors.age}</StyledHelperText>
                ) : (
                  ""
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Designation"
              variant="outlined"
              name="designation"
              onChange={handleChange}
              value={values.designation}
              onBlur={handleBlur}
              error={touched.designation && Boolean(errors.designation)}
              helperText={
                touched.designation && errors.designation ? (
                  <StyledHelperText>{errors.designation}</StyledHelperText>
                ) : (
                  ""
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Salary"
              variant="outlined"
              name="salary"
              onChange={handleChange}
              value={values.salary}
              onBlur={handleBlur}
              error={touched.salary && Boolean(errors.salary)}
              helperText={
                touched.salary && errors.salary ? (
                  <StyledHelperText>{errors.salary}</StyledHelperText>
                ) : (
                  ""
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#2aa0ca" }}
          >
            Submit
          </Button>
        </Grid>
        </Grid>
      </form>
    </>
  );
});

export default UpdateEmployeeById;
