import React, { createContext, useContext, useReducer } from "react";
//1
/*
createContext() returns a Provider which in turn accepts a value prop.
This Provider will later wrap our entire app. 
The value prop will receive our state which we will create with the useReducer hook. 
This hook accepts a reducer of type (state, action) => newState 
and returns the new state together with a dispatch function. 
*/
export const PaginationContext = createContext();

//2
const initialPageState = { previous: 0, current: 1, next: 2 };

const reducer = (state, action) => {
  switch (action.type) {
    case "nextQuestion":
      return {
        previous: state.previous + 1,
        current: state.current + 1,
        next: state.next + 1,
      };
    case "prevQuestion":
      return {
        previous: state.previous - 1,
        current: state.current - 1,
        next: state.next - 1,
      };
    case "reset":
      return initialPageState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const SurveyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialPageState);
  return (
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const useStore = () => useContext(PaginationContext);
