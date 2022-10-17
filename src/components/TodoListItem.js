import styles from "../styles/Todo.module.css";
import CustomButton from "./CustomButton";

export default function TodoListItem(props) {
  const { todoItem, todoList, changeTodoList } = props;

  const handleClickCheckDone = () => {
    let newTodoList = todoList;
    newTodoList.forEach((list) => {
      if (list.id === todoItem.id) {
        list.status = !list.status;
      }
    });
    changeTodoList([...newTodoList]);
  };

  const handleClickDeleteBtn = () => {
    let newTodoList = todoList;
    changeTodoList(newTodoList.filter((list) => list.id !== todoItem.id));
  };

  const handleClickEditBtn = () => {
    console.log("edit");
  };

  return (
    <li className={styles.itemContent}>
      <span
        style={{
          textDecorationLine: todoItem.status ? "line-through" : "none",
        }}
        onClick={handleClickCheckDone}
      >
        {todoItem.value}
      </span>
      <CustomButton
        title={"Delete button"}
        icon={"icon-trash"}
        hoverBgColor={"rgba(255, 75, 104, 1)"}
        handleClick={handleClickDeleteBtn}
      />
      <CustomButton
        title={"Edit button"}
        icon={"icon-pencil"}
        hoverBgColor={"rgba(0 , 150, 136, 1"}
        handleClick={handleClickEditBtn}
      />
    </li>
  );
}
