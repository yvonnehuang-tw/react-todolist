import { useState } from "react";
// import TodoInput from "./TodoInput";

let nextId = 0;

export default function TodoDemo() {
  const [inputValue, setInputValue] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const add = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      if (inputValue.trim() === "") {
        setErrorMessage(true);
      } else {
        todolist.push({
          id: nextId++,
          value: inputValue,
          status: false,
        });
        setErrorMessage(false);
        setInputValue("");
      }
    }
  };

  const deleteItem = (id) => {
    setTodolist(todolist.filter((list) => list.id !== id));
  };

  // const editItem = (id) => {
  //   console.log(id);
  // };

  const checkedListDone = (item) => {
    todolist.forEach((list) => {
      if (list.id === item.id) {
        list.status = !list.status;
      }
      setTodolist([...todolist]);
    });
  };

  const TodolistButton = ({ title, icon, list, handleClick }) => {
    return (
      <button type="button" title={title} onClick={() => handleClick(list.id)}>
        <i className={icon}></i>
      </button>
    );
  };

  const TodolistItems = () => (
    <ul>
      {todolist.length > 0 ? (
        todolist.map((list) => (
          <li className="list-content" key={list.id}>
            <span
              style={{
                textDecorationLine: list.status ? "line-through" : "none",
              }}
              onClick={() => checkedListDone(list)}
            >
              {list.value}
            </span>
            <TodolistButton
              title={"Delete button"}
              icon={"icon-trash"}
              list={list}
              handleClick={deleteItem}
            />
            {/* <TodolistButton
              title={"Edit button"}
              icon={"icon-pencil"}
              list={list}
              handleClick={editItem}
            /> */}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );

  const ErrorMessage = () => {
    return (
      errorMessage && <div className="error-message">Input is required.</div>
    );
  };

  const todoInput = () => (
    <div
      className="input-content"
      style={{ marginTop: errorMessage ? 20 : 50 }}
    >
      <input
        type="text"
        placeholder="Enter a todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={add}
        // ref={(input) => {
        //   if (input) {
        //     input.focus();
        //   }
        // }}
      />
      <button type="button" title="Add button" onClick={add}>
        <i className="icon-plus"></i>
      </button>
    </div>
  );

  return (
    <>
      <ErrorMessage />
      {/* <div
        className="input-content"
        style={{ marginTop: errorMessage ? 20 : 50 }}
      >
        <input
          type="text"
          placeholder="Enter a todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={add}
        />
        <button type="button" title="Add button" onClick={add}>
          <i className="icon-plus"></i>
        </button>
      </div> */}
      {todoInput()}
      {/* <TodoInput
        inputValue={inputValue}
        errorMessage={errorMessage}
        value={inputValue}
        changeEvent={(e) => setInputValue(e.target.value)}
        add={add}
      /> */}
      <br />
      <div>
        <TodolistItems />
      </div>
    </>
  );
}
