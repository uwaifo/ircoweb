import React, { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";
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

import { GetCurrentUser } from "../../helpers/getCurrentUser";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
const questionsUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/questions";
const singleQuestionUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/question";
const submitUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/survey";
function SurveySession() {
  const initialResponse = {
    questionId: "",
    userId: "",
    response: [],
  };
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [view, setView] = useState("");
  const [responseOption, setResponseOption] = useState({});

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
      //console.log("current should be :", jsonResponse);
      setCurrentQuestion(jsonResponse);
      setView(jsonResponse.questionType);
    } catch (error) {
      console.log(error);
    }
  };
  questions.sort(
    (a, b) => parseInt(a.sequenceNumber) - parseInt(b.sequenceNumber)
  );

  async function handleSubmit(e) {
    e.preventDefault();
    e.persist();
    try {
      const userResponseObj = await axios.post(submitUrl, responseOption);
      console.log(userResponseObj);
    } catch (error) {
      console.log(error);
    }
  }

  const renderOption = (function() {
    //
    async function handleSingleSelect(e) {
      e.persist();
      const resUser = await GetCurrentUser();
      setResponseOption({
        questionId: currentQuestion.questionId,
        userId: resUser.username,
        response: [e.target.value],
      });
      console.log(responseOption);
    }
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
              <FormGroup key={answerOption.id}>
                <div className="form-check-radio">
                  <Label className="form-check-label">
                    <Input
                      type="radio"
                      onChange={handleSingleSelect}
                      name="selectedoption"
                      id="exampleRadios1"
                      value={answerOption.id}
                    />
                    {answerOption.text}
                    <span className="form-check-sign"></span>
                  </Label>
                </div>
              </FormGroup>
            </>
          ))}

          <Button onClick={handleSubmit} color="primary" type="submit">
            Submit
          </Button>
        </form>
      );
    } else if (view === "MULTIPLE-CHOICE") {
      return (
        <form>
          {currentQuestion.responseOption.map((answerOption) => (
            <>
              <FormGroup key={answerOption.id}>
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

          <Button onClick={handleSubmit} color="primary" type="submit">
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
                  <option key={answerOption.id}>{answerOption.text}</option>
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
        <blockquote className="blockquote">
          <p className="mb-0">
            <h5 className="title">
              Here you are presented with 25 questions to comlplete at your
              convenient time.
              <br />
              You may choose to leave the survey and return at another time.Your
              response will be saved and you can complete it later.
            </h5>
          </p>
        </blockquote>
        <div>
          <h2>{currentQuestion.questionText}</h2>
          <br />
        </div>
        {renderOption}
        <br />
        <nav aria-label="...">
          <Pagination>
            {questions.map((count) => (
              <>
                <PaginationItem>
                  <PaginationLink
                    key={count.questionId}
                    href={`/user/test/${count.questionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      getSingleQuestionFromApi(count.questionId);
                      //setCurrentQuestion(count.questionId);

                      //console.log("current question :", currentQuestion);
                    }}
                  >
                    {count.sequenceNumber}
                  </PaginationLink>
                </PaginationItem>
              </>
            ))}
          </Pagination>
        </nav>
      </Container>
      <DemoFooter />
    </>
  );
}

export default SurveySession;
