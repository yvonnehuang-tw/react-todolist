import styles from "../../styles/Todo.module.css";
import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

let nextId = 0;
export default function TodoDemo() {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  // Add
  function handleAddTodo(inputValue) {
    setTodos([
      {
        id: nextId++,
        value: inputValue,
        done: false,
      },
      ...todos,
    ]);
  }

  // Edit
  function handleEditTodo() {}

  // Delete
  function handleDeleteTodo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  // Change todo
  function handleChangeTodo(tmpTodo) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === tmpTodo.id) {
          return tmpTodo;
        } else {
          return todo;
        }
      })
    );
  }

  const ErrorMessage = () =>
    errorMessage && <div className={styles.errorMessage}>Input is required.</div>;

  return (
    <>
      <ErrorMessage />
      <AddTodo
        onAddTodo={handleAddTodo}
        onErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
      <TodoList
        todos={todos}
        onClickDoneTodo={handleChangeTodo}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
