import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Task from "./Task";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const tasklist = [
  {
    id: uuidv4(),
    title: "عنوان المهمة 1",
    description: "نص المهمة",
    isDone: false,
  },
];

export default function Main() {
  const [todos, setTodos] = useState(tasklist);
  const [addTask, setAddTask] = React.useState("");

  const [alignment, setAlignment] = React.useState("all");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  let typeOfTodos = todos;
  if (alignment === "done") {
    typeOfTodos = todos.filter((t) => {
      return t.isDone;
    });
  } else if (alignment === "notDone") {
    typeOfTodos = todos.filter((t) => {
      return !t.isDone;
    });
  } else {
    typeOfTodos = todos;
  }
  let toDoList = typeOfTodos.map((e) => {
    return (
      <Task
        key={e.id}
        todos={e}
        handleStats={handleStats}
        confirmHandle={handleDelConfirm}
        updateHandle={updateHandle}
      />
    );
  });

  React.useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    storageTodos ? setTodos(storageTodos) : console.log("storage is empty");
  }, []);
  function handleStats(TaskId) {
    const checkId = todos.map((t) => {
      if (t.id === TaskId) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTodos(checkId);
    localStorage.setItem("todos", JSON.stringify(checkId));
  }

  function handleDelConfirm(TaskId) {
    const updatedTodos = todos.filter((t) => {
      return t.id !== TaskId;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function updateHandle(TaskId, taskArry) {
    const updatedTodos = todos.map((t) => {
      if (t.id === TaskId) {
        return taskArry;
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const ContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    maxHeight: "80%",
    overflow: "scroll",
  };

  return (
    <Container maxWidth="sm" style={ContainerStyle} dir="rtl">
      <Stack
        spacing={2}
        style={{
          backgroundColor: "#eee",
          paddingTop: "10px",
          padding: "20px",
        }}
      >
        <Typography variant="h2">مهامي</Typography>
        <Divider />
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          style={{ direction: "ltr", alignSelf: "center" }}
          color="secondary"
        >
          <ToggleButton value="notDone" aria-label="left aligned">
            <Typography variant="h6">غير منجز</Typography>
          </ToggleButton>
          <ToggleButton value="done" aria-label="centered">
            <Typography variant="h6">منجز </Typography>
          </ToggleButton>
          <ToggleButton value="all" aria-label="right aligned">
            <Typography variant="h6">الجميع</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        {toDoList}
        <Grid container spacing={2}>
          <Grid xs={8} item dir="ltr">
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              style={{ width: "100%" }}
              value={addTask}
              onChange={(event) => {
                setAddTask(event.target.value);
              }}
            />
          </Grid>
          <Grid xs={4} item>
            <Button
              variant="contained"
              style={{ width: "80%", height: "100%" }}
              disabled={addTask.length === 0 ? true : false}
              onClick={(event) => {
                const addTodo = {
                  id: uuidv4(),
                  title: addTask,
                  description: "نص فارغ",
                  isDone: false,
                };
                const updatedTodos = [...todos, addTodo];
                setTodos(updatedTodos);
                setAddTask("");
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
              }}
            >
              إضافة المهمة
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
