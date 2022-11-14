import styles from '../../styles/Todo.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import EditTodoModal from './EditTodoModal';

let nextId = 0;
export default function TodoDemo() {
  const { t } = useTranslation();

  const [todos, setTodos] = useState([]);
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [todoContent, setTodoContent] = useState({});

  // Add
  const handleAddTodo = inputValue => {
    setTodos([
      {
        id: nextId++,
        value: inputValue,
        done: false,
      },
      ...todos,
    ]);
  };

  const handleCloseEditModal = () => {
    setEditModalShow(false);
  };

  const handleSaveChangeTodo = () => {
    setTodos(
      todos.map(tmpTodo => {
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
  const handleOpenEditModal = tmpTodo => {
    setTodoContent(tmpTodo);
    setEditModalShow(true);
  };

  // Delete
  const handleDeleteTodo = todoId => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  // Change todo
  const handleChangeTodo = tmpTodo => {
    setTodos(
      todos.map(todo => {
        if (todo.id === tmpTodo.id) {
          return tmpTodo;
        } else {
          return todo;
        }
      })
    );
  };

  const ErrorMessage = () =>
    errorMessageShow && (
      <div className={styles.errorMessage}>{t('todolist.errorMessage')}</div>
    );

  return (
    <div className={`main ${styles.todolistContainer}`}>
      {/* <div className={styles.todolistContainer}> */}
      <ErrorMessage />
      <AddTodo
        onAddTodo={handleAddTodo}
        onErrorMessage={setErrorMessageShow}
        errorMessage={errorMessageShow}
      />
      <TodoList
        todos={todos}
        onClickDoneTodo={handleChangeTodo}
        onOpenEditModal={tmpTodo => handleOpenEditModal(tmpTodo)}
        onDeleteTodo={handleDeleteTodo}
      />
      <EditTodoModal
        todoContent={todoContent}
        editModalShow={editModalShow}
        onChangeTodo={setTodoContent}
        onCloseEditModal={handleCloseEditModal}
        onSaveChangeTodo={handleSaveChangeTodo}
      />
      {/* </div> */}
    </div>
  );
}
