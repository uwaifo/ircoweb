import React from "react";

function RenderQuestionStatement(props) {
  return (
    <>
      <div>
        <h2>{props.question.questionText}</h2>

        <br />
      </div>
    </>
  );
}

export default RenderQuestionStatement;
