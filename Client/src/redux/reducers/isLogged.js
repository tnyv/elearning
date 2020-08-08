const isLogged = (state = false, action) => {
  switch (action.type) {
    case "SET_LOGGED":
      return state = action.payload;
    default:
      return state;
  }
};

export default isLogged;
