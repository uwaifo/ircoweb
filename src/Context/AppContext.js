import React, { createContext, useState } from "react";
//const QuizContext = createContext();
//export default QuizContext;
export const SurveyContext = createContext();

const { Provider } = SurveyContext;
export const SurveyProvider = (props) => {
  const [message, setMessage] = useState("Initial context here !");
  return <Provider>{props.children}</Provider>;
};
