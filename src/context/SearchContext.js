import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  search: "",
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
        console.log("Oiiiiiiiiiiiiiiiii")
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};



















