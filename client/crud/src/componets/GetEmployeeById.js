import React, { useEffect } from "react";

import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

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

const GetEmployeeById = ({employee}) => {
    console.log('employee is',employee)
  return (
    <>
      <Grid container sx={style} spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Name:{employee.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Email:{employee.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Phone:{employee.phone}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Age:{employee.age}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Designation:{employee.designation}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Salary:{employee.salary}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default GetEmployeeById;
