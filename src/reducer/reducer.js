const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        loadingStatus: action.nextLoading,
      };
    case "CHANGE_USER_DATA":
      return {
        ...state,
        userData: action.nextUserData,
      };
    case "CHANGE_INPUT_TEXT":
      return {
        ...state,
        inputText: action.nextInputText,
      };
    case "CHANGE_ORIGIN_USER_DATA":
      return {
        ...state,
        originUserData: action.nextOriginUserData,
      };
    default:
      break;
  }
  throw Error("Unknown action: " + action.type);
};

export default reducer;
