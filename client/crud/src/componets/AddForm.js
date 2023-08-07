import React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { createEmployee } from "../reducers/employeeSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "	#6082B6",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: " 	#6082B6",
  },
}));

const StyledHelperText = styled("div")({
  color: "red",
  fontSize: "12px",
});

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
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

const AddForm = ({ handleClose1 }) => {
  const dispatch = useDispatch();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        age: "",
        designation: "",
        salary: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("values are", values);
        try {
          const actionResult = await dispatch(createEmployee(values));
          const response = unwrapResult(actionResult);
          console.log("response of add employee is", response);
          handleClose1();
        } catch (error) {
          console.error("error message", error.message);
        }
      },
    });
  const cancelPresentationIcon = () => {
    handleClose1();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "end",
            marginTop: "",
            color: "#FF7518",
          }}
        >
          <BootstrapTooltip title="close">
            {" "}
            <CancelPresentationIcon onClick={cancelPresentationIcon} />
          </BootstrapTooltip>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "start" }}>
          <Typography
            variant="h6"
            sx={{
              background: "#121FCF",
              backgroundImage:
                "linear-gradient(to right, #121FCF 0%, #CF1512 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "18px",
            }}
          >
            Add Employee Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="FullName"
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
            label="Email"
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
            label="Phone"
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
            label="Age"
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
                <styledHelperText>{errors.designation}</styledHelperText>
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
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddForm;
