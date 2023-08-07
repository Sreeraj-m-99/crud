import React, { useEffect } from "react";

import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PaidIcon from "@mui/icons-material/Paid";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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


const GetEmployeeById = ({ employee, onClose }) => {
  console.log("employee is", employee);
  const cancelPresentationIcon = () => {
    onClose();
  };
  return (
    <>
      <Grid container sx={style}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "end",
            marginTop: "-24px",
            color: "#FF7518",
          }}
        >
          <BootstrapTooltip title="close">
            <CancelPresentationIcon onClick={cancelPresentationIcon} />
          </BootstrapTooltip>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center",marginBottom:'19px' }}>
          <Typography
            variant="h6"
            sx={{
              background: "#121FCF",
              backgroundImage:
                "linear-gradient(to right, #121FCF 0%, #CF1512 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              
            }}
          >
            View Employee
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Avatar
            src="/broken-image.jpg"
            style={{
              width: "89px",
              height: "89px",
              marginLeft: "119px",
              background:
                "linear-gradient(68.6deg, rgb(252, 165, 241) 1.8%, rgb(181, 255, 255) 100.5%)",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#1699D7",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {employee.name}
          </Typography>
        </Grid>

        <Box sx={{ marginTop: "20px" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h8"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#36454f",
                columnGap: "10px",
              }}
            >
              <MailIcon sx={{ color: "#0BDA51" }} /> Mail
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "22px",
            }}
          >
            <Typography
              variant="h8"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#36454f",
                columnGap: "10px",
              }}
            >
              <PhoneAndroidIcon sx={{ color: "#0BDA51" }} /> Phone
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "22px",
            }}
          >
            <Typography
              variant="h8"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#36454f",
                columnGap: "10px",
              }}
            >
              <WorkHistoryIcon sx={{ color: "#0BDA51" }} /> Age
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "22px",
            }}
          >
            <Typography
              variant="h8"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#36454f",
                columnGap: "10px",
              }}
            >
              <ContactPageIcon sx={{ color: "#0BDA51" }} /> Designation
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "22px",
            }}
          >
            <Typography
              variant="h8"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#36454f",
                columnGap: "10px",
              }}
            >
              <PaidIcon sx={{ color: "#0BDA51" }} /> Salary
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "20px", marginLeft: "36px" }}>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h8">{employee.email}</Typography>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: "24px" }}
          >
            <Typography variant="h8">{employee.phone}</Typography>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: "26px" }}
          >
            <Typography variant="h8">{employee.age}</Typography>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: "24px" }}
          >
            <Typography variant="h8">{employee.designation}</Typography>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: "24px" }}
          >
            <Typography variant="h8">{employee.salary}</Typography>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default GetEmployeeById;
