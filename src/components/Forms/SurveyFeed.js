//import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { FormGroup, Label, Input, Button } from "reactstrap";
//export default function SurveyFeed(params) {
const SurveyFeed = (param) => {
  let { id } = useParams();

  const url = `https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/question/${id}`;

  const [question, setQuestion] = useState([]);
  const [view, setView] = useState("");
  //const [currentQuestion, setCurrentQuestion] = useState([]);

  useEffect(() => {
    getQuestionFromApi();
  });

  const getQuestionFromApi = async () => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    //console.log("data : ", jsonResponse);

    setQuestion(jsonResponse);
    setView(jsonResponse.questionType);
  };

  return (
    <div>
      View is {view}
      <h2>{question.questionText}</h2>
      <br />
      {(function() {
        if (view === "INPUT") {
          //return <button>textinput</button>;
          return (
            <form>
              <FormGroup>
                <Input
                  type="text"
                  name="password"
                  id="examplePassword"
                  //placeholder="PaSssword"
                  autoComplete="off"
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          );
        } else if (view === "SINGLE-CHOICE") {
          return (
            <form>
              {question.responseOption.map((answerOption) => (
                <>
                  <FormGroup>
                    <div className="form-check-radio">
                      <Label className="form-check-label">
                        <Input
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                        />
                        {answerOption.text}
                        <span className="form-check-sign"></span>
                      </Label>
                    </div>
                  </FormGroup>
                </>
              ))}

              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          );
        } else if (view === "MULTIPLE-CHOICE") {
          return (
            <form>
              {question.responseOption.map((answerOption) => (
                <>
                  <FormGroup>
                    <div className="form-check">
                      <Label className="form-check-label">
                        <Input
                          type="checkbox"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                        />
                        {answerOption.text}
                        <span className="form-check-sign"></span>
                      </Label>
                    </div>
                  </FormGroup>
                </>
              ))}

              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          );
        } else if (view === "DROPDOWN") {
          return (
            <form>
              <>
                <FormGroup>
                  <Label for="exampleSelect1">Example select</Label>
                  <Input type="select" name="select" id="exampleSelect1">
                    {question.responseOption.map((answerOption) => (
                      <option>{answerOption.text}</option>
                    ))}
                  </Input>
                </FormGroup>
              </>

              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          );
        }
      })()}
    </div>
  );
};
export default SurveyFeed;
