import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getAllEmployee,
  deleteEmployeeById,
  getEmployeeByID,
} from "../reducers/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import GetEmployeeById from "./GetEmployeeById";

const ViewEmployees = ({ employeeId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployee());
    console.log("dispatched data ", dispatch);
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
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

  const deleteData = (employeeId) => {
    dispatch(deleteEmployeeById(employeeId));
  };

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


  return (
    <>
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
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(employees) &&
              employees.map((employee) => (
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
                  <StyledTableCell align="left">{employee.age}</StyledTableCell>
                  <StyledTableCell align="left">
                    {employee.designation}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {employee.salary}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <VisibilityIcon
                      color="success"
                      onClick={() => handleOpen(employee)}
                    />

                    <BorderColorIcon color="primary" />
                    <DeleteIcon
                      sx={{ color: "#f10c45" }}
                      onClick={() => deleteData(employee._id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedEmployee && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <GetEmployeeById employee={selectedEmployee} />
        </Modal>
      )}

      
    </>
  );
};

export default ViewEmployees;
