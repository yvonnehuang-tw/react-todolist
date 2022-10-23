import CustomButton from "../common/CustomButton";

export default function TodoItem({
  todo,
  onClickDoneTodo,
  onOpenEditModal,
  onDeleteTodo,
}) {
  return (
    <>
      <span
        style={{
          textDecorationLine: todo.done ? "line-through" : "none",
        }}
        onClick={() => onClickDoneTodo({ ...todo, done: !todo.done })}
      >
        {todo.value}
      </span>
      <CustomButton
        title={"Edit button"}
        icon={"icon-pencil"}
        hoverBgColor={"rgba(0 , 150, 136, 1"}
        onClick={() => onOpenEditModal(todo)}
      />
      <CustomButton
        title={"Delete button"}
        icon={"icon-trash"}
        hoverBgColor={"rgba(255, 75, 104, 1)"}
        onClick={() => onDeleteTodo(todo.id)}
      />
    </>
  );
}
