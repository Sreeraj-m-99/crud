import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllEmployee, deleteEmployeeById } from "../reducers/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

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
    console.log("employeeId is",employeeId)
    console.log("Dispatch function:", dispatch);
    dispatch(deleteEmployeeById(employeeId));
    console.log("hai");
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
            {employees.map((employee) => (
              <StyledTableRow key={employee._id}>
                <StyledTableCell align="left">{employee.name}</StyledTableCell>
                <StyledTableCell align="left">{employee.email}</StyledTableCell>
                <StyledTableCell align="left">{employee.phone}</StyledTableCell>
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
                  <VisibilityIcon color="success" />{" "}
                  <BorderColorIcon color="primary" />{" "}
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
    </>
  );
};

export default ViewEmployees;
