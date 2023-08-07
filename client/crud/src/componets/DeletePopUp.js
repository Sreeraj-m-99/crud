import { Alert, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmployeeById } from "../reducers/employeeSlice";
import InfoIcon from "@mui/icons-material/Info";
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
const DeletePopUp = ({ onClose, employee }) => {
  const dispatch = useDispatch();

  const deletePop = () => {
    dispatch(deleteEmployeeById(employee));
    onClose();
  };

  const later = () => {
    onClose();
  };
  const cancelPresentationIcon = () => {
    onClose();
  };

  return (
    <>
      <Grid container spacing={4}>
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
           <BootstrapTooltip title="close"> <CancelPresentationIcon onClick={cancelPresentationIcon} /></BootstrapTooltip>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfoIcon color="primary" sx={{ fontSize: "84px" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#36454f",
            }}
          >
            {" "}
            Are you sure!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", columnGap: "20px", justifyContent: "center" }}
        >
          <Button variant="contained" onClick={deletePop}>
            yes
          </Button>
          <Button variant="contained" onClick={later}>
            No
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DeletePopUp;
