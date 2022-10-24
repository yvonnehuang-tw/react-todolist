import styles from "../../styles/Todo.module.css";
import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import EditTodoModal from "./EditTodoModal";

let nextId = 0;
export default function TodoDemo() {
  const [todos, setTodos] = useState([]);
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [todoContent, setTodoContent] = useState({});

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

  const handleCloseEditModal = () => {
    setEditModalShow(false);
  };

  const handleSaveChangeTodo = () => {
    setTodos(
      todos.map((tmpTodo) => {
        if (tmpTodo.id === todoContent.id) {
          return todoContent;
        } else {
          return tmpTodo;
        }
      })
    );
    setEditModalShow(false);
  };

  // Edit
  function handleOpenEditModal(tmpTodo) {
    setTodoContent(tmpTodo);
    setEditModalShow(true);
  }

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
    errorMessageShow && (
      <div className={styles.errorMessage}>Input is required.</div>
    );

  return (
    <div className={styles.todolistContainer}>
      <ErrorMessage />
      <AddTodo
        onAddTodo={handleAddTodo}
        onErrorMessage={setErrorMessageShow}
        errorMessage={errorMessageShow}
      />
      <TodoList
        todos={todos}
        onClickDoneTodo={handleChangeTodo}
        onOpenEditModal={(tmpTodo) => handleOpenEditModal(tmpTodo)}
        onDeleteTodo={handleDeleteTodo}
      />
      <EditTodoModal
        todoContent={todoContent}
        editModalShow={editModalShow}
        onChangeTodo={setTodoContent}
        onCloseEditModal={handleCloseEditModal}
        onSaveChangeTodo={handleSaveChangeTodo}
      />
    </div>
  );
}
