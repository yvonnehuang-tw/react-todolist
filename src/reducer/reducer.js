const initialState = {
  status: true,
};

const reducer = (state = initialState, action) => {
  if (action.type === "IS_LOADING") {
    return { status: !state };
  }
};

export default reducer;
