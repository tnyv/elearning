const jwt = (state = "", action) => {
    switch (action.type) {
      case "ADD_JWT":
        return state = action.payload;
      case "RESET_JWT":
        return state = "";
      default:
        return state;
    }
  };
  
  export default jwt;
  