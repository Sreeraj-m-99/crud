import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllEmployee } from "../reducers/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import GetEmployeeById from "./GetEmployeeById";
import UpdateEmployeeById from "./UpdateEmployeeById";
import AddIcon from "@mui/icons-material/Add";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AddForm from "./AddForm";
import DeletePopUp from "./DeletePopUp";
import { Search as SearchIcon } from "@mui/icons-material";

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
style["@media (max-width: 600px)"] = {
  width: "90%",
};

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

const searchInputContainer = {
  position: "relative",
  width:'120px',
  height:'25px',
  padding:'10px 0'

};

const searchInputStyle = {
  padding: "5px 5px 5px 32px",
  marginBottom: "10px",
  width: "100%",
  boxSizing: "border-box",
  
};

const searchIconStyle = {
  position: "absolute",
  top: "55%",
  left: "10px",
  transform: "translateY(-50%)",
  color: "#ccc",
  fontSize:'21px'
};

const ViewEmployees = ({ employeeId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployee());
    console.log("dispatched data ", dispatch);
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#3b444b ",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: " 1px solid #e0e0e0",
    },
  }));

  const employees = useSelector((state) => state?.employee?.employees);
  console.log("employees are", employees);

  // const deleteData = (employeeId) => {
  //   dispatch(deleteEmployeeById(employeeId));
  // };

  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);

  const handleOpen = (employee) => {
    setOpen(true);
    console.log("employe clicked is", employee);
    setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [employeeAsProps, setEmployeeAsProps] = React.useState(null);
  const updateEmployeeOpen = (employee) => {
    setUpdateOpen(true);
    setEmployeeAsProps(employee);
  };

  const updateEmployeeClose = () => {
    setUpdateOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = React.useState(false);

  const [deleteEmployeeAsProps, setDeleteEmployeeAsProps] =
    React.useState(null);

  const handleOpenDelete = (employeeId) => {
    setOpen2(true);
    setDeleteEmployeeAsProps(employeeId);
  };
  const handleCloseDelete = () => {
    setOpen2(false);
  };
  console.log("employee id for delete", deleteEmployeeAsProps);

  const [searchInput, setSearchInput] = useState("");

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    if (searchTerm) {
      const filtered = employees.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.phone.toLowerCase().includes(searchTerm.toLowerCase())||
          employee.age.toString().includes(searchTerm.toLowerCase()) || 
          employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.salary.toString().includes(searchTerm.toLowerCase())
        
          
        );
      });
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  };

  const employeesToRender = searchInput ? filteredEmployees : employees;

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: "20px",
          paddingTop: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            background: "#121FCF",
            backgroundImage:
              "linear-gradient(to right, #121FCF 0%, #CF1512 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "18px",
          }}
        >
          Employee_Connect
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "20px", paddingBottom: "" }}>
        <div style={searchInputContainer}>
          <input
            type="text"
            placeholder="search...."
            value={searchInput}
            onChange={handleSearchChange}
            style={searchInputStyle}
          />
          <SearchIcon style={searchIconStyle} />
        </div>
      </Grid>
      <Grid container sx={{ padding: "0 20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Age</StyledTableCell>
                <StyledTableCell align="left">Designation</StyledTableCell>
                <StyledTableCell align="left">Salary</StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "13px",
                  }}
                >
                  Actions
                  <BootstrapTooltip title="Add">
                    <AddIcon onClick={handleOpen1} />
                  </BootstrapTooltip>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(employeesToRender) &&
                employeesToRender.map((employee) => (
                  <StyledTableRow key={employee._id}>
                    <StyledTableCell align="left">
                      {employee.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee.phone}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee.age}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee.designation}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee.salary}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        gap: "14px",
                      }}
                    >
                      <BootstrapTooltip title="View">
                        <VisibilityIcon
                          color="success"
                          onClick={() => handleOpen(employee)}
                        />
                      </BootstrapTooltip>
                      <BootstrapTooltip title="Edit">
                        <BorderColorIcon
                          color="primary"
                          onClick={() => updateEmployeeOpen(employee)}
                        />
                      </BootstrapTooltip>
                      <BootstrapTooltip title="Delete">
                        <DeleteIcon
                          sx={{ color: "#f10c45" }}
                          onClick={() => handleOpenDelete(employee._id)}
                        />
                      </BootstrapTooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {employeeAsProps && (
          <Modal
            open={updateOpen}
            onClose={updateEmployeeClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <UpdateEmployeeById
              employee={employeeAsProps}
              onClose={updateEmployeeClose}
            />
          </Modal>
        )}
        {selectedEmployee && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <GetEmployeeById
              employee={selectedEmployee}
              onClose={handleClose}
            />
          </Modal>
        )}
        {open1 && (
          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Grid container sx={style}>
              <AddForm handleClose1={handleClose1} />
            </Grid>
          </Modal>
        )}
        {open2 && (
          <Modal
            open={open2}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Grid container sx={style}>
              <DeletePopUp
                onClose={handleCloseDelete}
                employee={deleteEmployeeAsProps}
              />
            </Grid>
          </Modal>
        )}
      </Grid>
    </>
  );
};

export default ViewEmployees;
