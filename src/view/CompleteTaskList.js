import React, { useEffect, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Stack, Typography } from "@mui/material";
import Header from "../component/Header";
import axios from "axios";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CompleteTaskList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = React.useState();
  const [open1, setOpen1] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  useEffect(() => {
    axios.get(`http://localhost:3004/todo`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  // filter and search
  const sortedDetail = useMemo(() => {
    return data.filter(
      (item) =>(item.task_status === "Complete")
    );
  }, [data]);

  const handleDelete = (id) => {
    const myID = id;
    console.log(myID);
    axios.delete(`http://localhost:3004/todo/${myID}`).then(() => {
      // console.log("sucess");
      alert("Succesfully Deleted");
      window.location.reload(false);
    });
  };

  const HandleStatus = (id, taskName, taskStatus) => {
    const detail = {
      task_name: taskName,
      task_detail: taskStatus,
      task_status: "pending",
    };
    axios.put(`http://localhost:3004/todo/${id}`, detail).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };
  const HandleStatus1 = (id, taskName, taskStatus) => {
    const detail = {
      task_name: taskName,
      task_detail: taskStatus,
      task_status: "Complete",
    };
    axios.put(`http://localhost:3004/todo/${id}`, detail).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  const handleUpdate = (id) => {
    setUpdateId(id);
    setOpen(true);
  };
  return (
    <div>
      <Header />
      <br />
      <br />
      <Container>
        <Stack spacing={1} direction="row" justifyContent="flex-end">
          <Button onClick={() => setOpen1(true)} variant="contained">
            Add New
          </Button>
        </Stack>
        <Typography variant="h5">All Completed Task</Typography>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Task Name</StyledTableCell>
                <StyledTableCell>Task Detail</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDetail.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell>{item.task_name}</StyledTableCell>
                  <StyledTableCell>{item.task_detail}</StyledTableCell>
                  <StyledTableCell>
                    {item && item.task_status === "Complete" ? (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                item.task_status === "Complete" ? true : false
                              }
                              onChange={() =>
                                HandleStatus(
                                  item.id,
                                  item.task_name,
                                  item.task_detail
                                )
                              }
                            />
                          }
                          label={item.task_status}
                        />
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                item.task_status === "Complete" ? true : false
                              }
                              onChange={() =>
                                HandleStatus1(
                                  item.id,
                                  item.task_name,
                                  item.task_detail
                                )
                              }
                            />
                          }
                          label={item.task_status}
                        />
                      </FormGroup>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack spacing={1} direction="row">
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <EditTask Id={updateId} open={open} onClose={handleClose} />

      <AddTask open={open1} onClose={handleClose1} />
    </div>
  );
}
