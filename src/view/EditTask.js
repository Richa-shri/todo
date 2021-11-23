import React, { useState, useEffect, memo } from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EditTask(props) {
  const [taskName, setTaskName] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const [taskStatus, setTaskStatus] = useState();
  const [taskTargettime, setTaskTargettime] = useState();
  const { onClose, open } = props;

  useEffect(() => {
    axios.get(`http://localhost:3004/todo/${props.Id}`).then((res) => {
      console.log(res.data);
      setTaskName(res.data.task_name);
      setTaskDetail(res.data.task_detail);
      setTaskStatus(res.data.task_status);
      setTaskTargettime(res.data.target_time);
    });
  }, [props.Id]);

  const handleSubmit = () => {
    const detail = {
      task_name: taskName,
      task_detail: taskDetail,
      task_status: taskStatus,
      start_time: new Date(),
      target_time: taskTargettime,
    };
    axios.put(`http://localhost:3004/todo/${props.Id}`, detail).then((res) => {
      console.log(res.data);
      alert("success");
    });
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Task {props.Id}</DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Task Name"
              name="task_name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            />
            <TextField
              label="Detail"
              name="task_detail"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTaskDetail(e.target.value)}
              value={taskDetail}
            />
           <FormControl fullWidth margin="dense">
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taskStatus}
          label="Status"
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
        </Select>
      </FormControl>

            <TextField
              label="Target to Complete"
              name="target_time"
              fullWidth
              type="date"
              margin="normal"
              value={taskTargettime}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTaskTargettime(e.target.value)}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Update Task
            </Button>{" "}
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
