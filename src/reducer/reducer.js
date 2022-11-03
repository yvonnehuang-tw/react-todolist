const reducer = (state, action) => {
  switch (action.type) {
    case 'trigger_loading':
      return {
        ...state,
        loadingStatus: action.nextLoading,
      };
    case 'changed_user_data':
      return {
        ...state,
        userData: action.nextUserData,
      };
    case 'changed_input_text':
      return {
        ...state,
        inputText: action.nextInputText,
      };
    case 'changed_origin_user_data':
      return {
        ...state,
        originUserData: action.nextOriginUserData,
      };
    default:
      break;
  }
  throw Error('Unknown action: ' + action.type);
};

export default reducer;
