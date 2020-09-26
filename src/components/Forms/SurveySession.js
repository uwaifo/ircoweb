import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
const questionsUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/questions";
const singleQuestionUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/question";

function SurveySession() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [view, setView] = useState("");

  useEffect(() => {
    getQuestionsFromApi();
    //getSingleQuestionFromApi(argId);
  });

  const getQuestionsFromApi = async () => {
    const response = await fetch(questionsUrl);
    const jsonResponse = await response.json();
    setQuestions(jsonResponse);
  };

  const getSingleQuestionFromApi = async (argId) => {
    let argUrl = singleQuestionUrl + "/" + argId;
    try {
      const response = await fetch(argUrl);
      const jsonResponse = await response.json();
      console.log("current should be :", jsonResponse);
      setCurrentQuestion(jsonResponse);
      setView(jsonResponse.questionType);
    } catch (error) {
      console.log(error);
    }
  };
  questions.sort(
    (a, b) => parseInt(a.sequenceNumber) - parseInt(b.sequenceNumber)
  );

  const renderOption = (function() {
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
          {currentQuestion.responseOption.map((answerOption) => (
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
          {currentQuestion.responseOption.map((answerOption) => (
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
                {currentQuestion.responseOption.map((answerOption) => (
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
  })();

  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <Container>
        <div>
          <h2>{currentQuestion.questionText}</h2>
          <br />
        </div>
        {renderOption}
        <br />
        <nav aria-label="...">
          <Pagination>
            <PaginationItem className="disabled">
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                tabindex="-1"
              >
                Previous
              </PaginationLink>
            </PaginationItem>
            {questions.map((count) => (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`/user/test/${count.questionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      getSingleQuestionFromApi(count.questionId);
                      //setCurrentQuestion(count.questionId);

                      console.log("current question :", currentQuestion);
                    }}
                  >
                    {count.sequenceNumber}
                  </PaginationLink>
                </PaginationItem>
              </>
            ))}

            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      </Container>
      <DemoFooter />
    </>
  );
}

export default SurveySession;
