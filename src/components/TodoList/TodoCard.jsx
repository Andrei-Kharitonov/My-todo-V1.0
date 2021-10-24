import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo } from "../../reducers/todo.reducer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function TodoCard({ title, text, date, id, completed }) {
  let dispatch = useDispatch();

  function performTodo(id) {
    dispatch(completeTodo(id));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}/completed.json`, {
      method: "PUT",
      body: JSON.stringify(true),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  function removeTodo(id) {
    dispatch(deleteTodo(id));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  return (
    <Card id={id} className={completed ? "todo todo_comp" : "todo"}>
      <Card className="todo__container" variant="outlined">
        <React.Fragment>
          <CardContent style={{ width: "100%" }}>
            <Typography className={completed ? "todo__title todo__title_comp" : "todo__title"} variant="h5" component="h5">
              {title}
            </Typography>
            <Typography className="todo__text" variant="p" component="p">
              {text}
            </Typography>
            <hr />
            <Typography className="todo__date" variant="p" component="p">
              Date: {date}
            </Typography>
            <Typography className={completed ? "todo__status todo__status_comp" : "todo__status"} variant="p" component="p">
              Status: {completed ? "completed" : "not completed"}
            </Typography>
          </CardContent>
          <CardActions className="todo__btns">
            <Button
              className="todo__btn-comp"
              variant="outlined"
              color={completed ? "success" : "primary"}
              startIcon={<DoneOutlineIcon />}
              onClick={() => performTodo(id)}
            >
              Complete
            </Button>
            <Button
              className="todo__btn-del"
              variant="outlined"
              color="error"
              style={{ marginLeft: "0" }}
              startIcon={<DeleteIcon />}
              onClick={() => removeTodo(id)}
            >
              Delete
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Card >
  );
}

TodoCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool
};

export default TodoCard;