import * as React from "react";
import "./styles/Task.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/* icons  */

import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function Task({
  todos,
  handleStats,
  confirmHandle,
  updateHandle,
}) {
  /////////// styles ////////////
  const TaskStyle = {
    backgroundColor: todos.isDone ? "#1b5e20" : "#546e7a",
    color: "white",
    padding: "15px 5px",
    borderRadius: "10px",
  };

  ////////// event functions /////////
  // Delete Dialog Events //
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(todos);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelConfirm = () => {
    confirmHandle(todos.id);
    setOpen(false);
  };

  // update Dialog Events //
  const [updateOpen, setUpdateOpen] = React.useState(false);

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  const handleUpdateConfirm = () => {
    updateHandle(todos.id, update);
    setUpdateOpen(false);
  };

  return (
    <Grid style={TaskStyle} container className="Task" color="card">
      {/*////////// delete confirm dialog ////////////// */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="alert-dialog-title">
          هل تريد حذف هذه المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            إنتبه، لا يمكنك التراجع بعد إتمام عملية الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button onClick={handleDelConfirm} autoFocus>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/*///////////////// update dialog ///////////*/}
      <Dialog open={updateOpen} onClose={handleUpdateClose} dir="rtl">
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="update-title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="filled"
            value={update.title}
            onChange={(e) => {
              setUpdate({ ...update, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="update-details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="filled"
            value={update.description}
            onChange={(e) => {
              setUpdate({ ...update, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            gap: "10px",
            padding: "0 0 15px 10px",
          }}
        >
          <Button variant="outlined" onClick={handleUpdateClose}>
            إغلاق
          </Button>
          <Button variant="outlined" onClick={handleUpdateConfirm}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        item
        xs={8}
        className="task-test"
        display="flex"
        alignItems="start"
        style={{ paddingRight: "20px", flexDirection: "column" }}
      >
        <Typography
          variant="h5"
          style={{ textDecoration: todos.isDone ? "line-through" : "none" }}
        >
          {" "}
          {todos.title}
        </Typography>
        <Typography
          variant="body1"
          style={{ textDecoration: todos.isDone ? "line-through" : "none" }}
        >
          {todos.description}{" "}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <IconButton
          style={{
            color: todos.isDone ? "white" : "green",
            border: "2px solid green",
            backgroundColor: todos.isDone ? "green" : "white",
          }}
          onClick={(e) => {
            handleStats(todos.id);
          }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          style={{
            color: "#2196f3",
            border: "2px solid #2196f3",
          }}
          className="toggle-btn"
          onClick={handleUpdateClickOpen}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          style={{
            color: "red",
            border: "2px solid red",
          }}
          className="toggle-btn"
          onClick={handleClickOpen}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
