import styles from "../../styles/Todo.module.css";
import { useState } from "react";
import CustomButton from "../common/CustomButton";

export default function AddTodo({ onAddTodo, onErrorMessage, errorMessage }) {
  const [inputValue, setInputValue] = useState("");

  function handleChangeInputValue(event) {
    setInputValue(event.target.value);
  }

  function handleClickAddBtn(event) {
    if (event.type === "click" || event.key === "Enter") {
      if (inputValue.trim() === "") {
        onErrorMessage(true);
      } else {
        onErrorMessage(false);
        onAddTodo(inputValue);
        setInputValue("");
      }
    }
  }

  return (
    <div className={styles.inputContent} style={{ marginTop: errorMessage ? 20 : 50 }}>
      <input
        type="text"
        placeholder="Enter a todo..."
        value={inputValue}
        onChange={(e) => handleChangeInputValue(e)}
        onKeyUp={(e) => handleClickAddBtn(e)}
      />
      <CustomButton
        title="Add button"
        icon="icon-plus"
        hoverBgColor={"rgba(17, 141, 240, 1)"}
        onClick={(e) => handleClickAddBtn(e)}
      />
    </div>
  );
}
