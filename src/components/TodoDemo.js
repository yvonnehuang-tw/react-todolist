import styles from "../styles/Todo.module.css";
import { useState } from "react";
import CustomButton from "./CustomButton";
import TodoListItem from "./TodoListItem";

let nextId = 0;
export default function TodoDemo() {
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChangeTodo = (event) => {
    setTodoInputValue(event.target.value);
  };

  const handleAddBtn = (event) => {
    let tmpTodo = todoInputValue;
    // let tmpTodoList = todoList;
    if (event.type === "click" || event.key === "Enter") {
      if (tmpTodo.trim() === "") {
        setErrorMessage(true);
      } else {
        // tmpTodoList.push({
        //   id: nextId++,
        //   value: tmpTodo,
        //   status: false,
        // });
        let newTodo = {
          id: nextId++,
          value: tmpTodo,
          status: false,
        };
        setErrorMessage(false);
        // setTodoList(tmpTodoList);
        setTodoList([...todoList, newTodo]);
        setTodoInputValue("");
      }
    }
  };

  const changeTodoList = (newTodoList) => {
    setTodoList(newTodoList);
  };

  const ErrorMessage = () =>
    errorMessage && <div className={styles.errorMessage}>Input is required.</div>;

  return (
    <>
      <ErrorMessage />
      <div
        className={styles.inputContent}
        style={{ marginTop: errorMessage ? 20 : 50 }}
      >
        <input
          type="text"
          placeholder="Enter a todo..."
          value={todoInputValue}
          onChange={handleChangeTodo}
          onKeyUp={handleAddBtn}
        />
        <CustomButton
          title="Add button"
          icon="icon-plus"
          hoverBgColor={"rgba(17, 141, 240, 1)"}
          handleClick={handleAddBtn}
        />
      </div>
      <div className={styles.listContent}>
        <ul>
          {todoList.map((list) => (
            <TodoListItem
              key={list.id}
              todoItem={list}
              todoList={todoList}
              changeTodoList={changeTodoList}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
