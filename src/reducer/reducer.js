const reducer = (state, action) => {
  if (action.type === "IS_LOADING") {
    return { status: action.nextLoading };
  }
  throw Error("Unknown action: " + action.type);
};

export default reducer;
