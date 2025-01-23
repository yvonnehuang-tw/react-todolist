import { useTranslation } from 'react-i18next';

import CustomButton from '../common/CustomButton';

const TodoItem = ({
  todo,
  onClickDoneTodo,
  onOpenEditModal,
  onDeleteTodo,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <span
        style={{
          textDecorationLine: todo.done ? 'line-through' : 'none',
        }}
        onClick={() => onClickDoneTodo({ ...todo, done: !todo.done })}
      >
        {todo.value}
      </span>
      <CustomButton
        title={t('todolist.editBtn')}
        icon={'icon-pencil'}
        hoverBgColor={'rgba(0 , 150, 136, 1'}
        onClick={() => onOpenEditModal(todo)}
      />
      <CustomButton
        title={t('todolist.deleteBtn')}
        icon={'icon-trash'}
        hoverBgColor={'rgba(255, 75, 104, 1)'}
        onClick={() => onDeleteTodo(todo.id)}
      />
    </>
  );
}

export default TodoItem;