import CustomButton from "../common/CustomButton";

export default function TodoItem({ todo, onClickDone, onEdit, onDelete }) {
  return (
    <>
      <span
        style={{
          textDecorationLine: todo.done ? "line-through" : "none",
        }}
        onClick={() => onClickDone({ ...todo, done: !todo.done })}
      >
        {todo.value}
      </span>
      <CustomButton
        title={"Edit button"}
        icon={"icon-pencil"}
        hoverBgColor={"rgba(0 , 150, 136, 1"}
        handleClick={(e) => onEdit()}
      />
      <CustomButton
        title={"Delete button"}
        icon={"icon-trash"}
        hoverBgColor={"rgba(255, 75, 104, 1)"}
        handleClick={() => onDelete(todo.id)}
      />
    </>
  );
}
