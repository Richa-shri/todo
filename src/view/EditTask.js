import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditTask(props) {
  const [taskName, setTaskName] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const { onClose, open } = props;

  useEffect(() => {
    axios.get(`http://localhost:3004/todo/${props.Id}`).then((res) => {
      console.log(res.data);
      setTaskName(res.data.task_name);
      setTaskDetail(res.data.task_detail);
    
    });
  }, [props.Id]);

  const handleSubmit = () => {
    const detail = {
      task_name: taskName,
      task_detail: taskDetail,
      
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
