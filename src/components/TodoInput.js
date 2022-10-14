const TodoInput = ({ errorMessage, value, changeEvent, add }) => (
  <div className="input-content" style={{ marginTop: errorMessage ? 20 : 50 }}>
    <input
      type="text"
      placeholder="Enter a todo..."
      value={value}
      // onChange={(e) => setInputValue(e.target.value)}
      // onKeyUp={add}
      onChange={changeEvent}
      onKeyUp={add}
    />
    <button type="button" title="Add button" onClick={add}>
      <i className="icon-plus"></i>
    </button>
  </div>
);

export default TodoInput;
