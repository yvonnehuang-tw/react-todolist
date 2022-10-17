import styles from "../styles/Todo.module.css";
import CustomButton from "./CustomButton";

export default function TodoListItem(props) {
  const { todoItem, todoList, changeTodoList } = props;

  const handleClickDeleteBtn = () => {
    console.log("Delete");
    let newTodoList = todoList;
    changeTodoList(newTodoList.filter((list) => list.id !== todoItem.id));
  };

  const handleClickCheckDone = () => {
    let newTodoList = todoList;
    newTodoList.forEach((list) => {
      if (list.id === todoItem.id) {
        list.status = !list.status;
      }
    });
    changeTodoList([...newTodoList]);
  };

  return (
    <li className={styles.listContent}>
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
        handleClick={handleClickDeleteBtn}
      />
      {/* <CustomButton
        title={"Edit button"}
        icon={"icon-pencil"}
        handleClick={handleClickEditBtn}
      /> */}
    </li>
  );
}
