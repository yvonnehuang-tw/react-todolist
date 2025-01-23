import styles from '../../styles/Todo.module.css';

import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onClickDoneTodo,
  onOpenEditModal,
  onDeleteTodo,
}) => {
  return (
    <div className={styles.listContent}>
      <ul>
        {todos.map(todo => (
          <li className={styles.itemContent} key={todo.id}>
            <TodoItem
              todo={todo}
              onClickDoneTodo={onClickDoneTodo}
              onOpenEditModal={onOpenEditModal}
              onDeleteTodo={onDeleteTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;