import React from "react";

const context = React.createContext(0);

export const StoreProvider = ({
  children,
  reducer,
  initialState = {
    position: 0,
  },
}: any) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  const contextValue = React.useMemo(
    () => [store, dispatch],
    [store, dispatch]
  );
  // @ts-ignore
  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default function useStore() {
  return React.useContext(context);
}
