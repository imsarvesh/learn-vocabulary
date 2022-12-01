const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return {
        position: action.position,
      };
    default:
      throw new Error("Unknown action!", action);
  }
};

export default reducer;
