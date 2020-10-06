import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React, { useEffect, useState } from "react";
import {
  Container,
  //Button,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { GetCurrentUser } from "../../helpers/getCurrentUser";

const questionsUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/questions";
const singleQuestionUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/question";

function SurveySession() {
  let userSurveyObj = [];

  const paginationState = {
    previous: -1,
    current: 0,
    next: 1,
  };

  //ALL QUESTIONS
  const [questions, setQuestions] = useState([]);
  questions.sort(
    (a, b) => parseInt(a.sequenceNumber) - parseInt(b.sequenceNumber)
  );

  //RESPONSE OPTION
  const [responseOption, setResponseOption] = useState({});

  const [pagination, setPagination] = useState(paginationState);

  //CURRENT QUESTION AND TYPE OF OPTIONS VIEW
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentUser, setSessionUser] = useState({});
  const [view, setView] = useState([]);

  //console.log(pagination);

  useEffect(() => {
    getQuestionsFromApi();
  }, []);

  useEffect(() => {
    setQuestion();
  });

  useEffect(() => {
    setQuestionView();
  });

  const getQuestionsFromApi = async () => {
    const response = await fetch(questionsUrl);
    const jsonResponse = await response.json();
    setQuestions(jsonResponse);
    //setCurrentQuestion(questions[pagination.current]);

    //Get User
    const resUser = await GetCurrentUser();
    setSessionUser(resUser);
  };
  //console.log(pagination);

  const setQuestion = async () => {
    await setCurrentQuestion(questions[pagination.current]);
  };

  const setQuestionView = async () => {
    try {
      const viewUrl = `${singleQuestionUrl}/${currentQuestion.questionId}`;
      const properview = await fetch(viewUrl);
      const jsonResponse = await properview.json();

      setView(jsonResponse.questionType);

      //console.log("view : ", view);

      //console.log(viewUrl);
    } catch (error) {
      console.log(error);
    }
  };
  //setCurrentQuestion(questions[pagination.current]);
  // setView(questions[pagination.current]);

  async function handleSubmit() {
    //append to tempral object
    // userSurveyObj.push(userSurveyObj, responseOption);
    //console.log(userSurveyObj);
    /*
    try {
      const userResponseObj = await axios.post(submitUrl, responseOption);
      console.log("SENDING : ", responseOption);
      console.log("RECEIVING : ", userResponseObj);
    } catch (error) {
      console.log(error);
    }
    setResponseOption(initialResponse);
    console.log("RESET TO ", responseOption);
    */
  }
  async function handleSingleSelect(e) {
    e.persist();
    //const resUser = await GetCurrentUser();
    setResponseOption({
      questionId: currentQuestion.questionId,
      userId: currentUser.username,
      response: [e.target.value],
    });
    //console.log(responseOption);
    //console.log(e.target.id);
  }

  async function handleMultipleSelect(e) {
    e.persist();
    const resUser = await GetCurrentUser();
    setResponseOption({
      questionId: currentQuestion.questionId,
      userId: resUser.username,
      response: [e.target.value],
    });
    console.log(responseOption);
    console.log(e.target.id);
  }

  function handleTextInput(e) {
    e.persist();

    setResponseOption({
      questionId: currentQuestion.questionId,
      userId: setSessionUser.username,
      response: [e.target.value],
    });

    console.log(responseOption);
    console.log(e.target.id);
  }
  //RENDER OPTION
  const renderOption = (function(e) {
    //

    if (view === "INPUT") {
      //return <button>textinput</button>;
      return (
        <>
          <form>
            <FormGroup>
              <Input
                type="text"
                name="password"
                id={currentQuestion.text}
                onChange={handleTextInput}
                //placeholder="PaSssword"
                autoComplete="off"
              />
            </FormGroup>
          </form>
        </>
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
                      key={answerOption.id}
                      type="radio"
                      onChange={handleSingleSelect}
                      name="selectedoption"
                      //id="exampleRadios1"
                      value={answerOption.id}
                      id={answerOption.text}
                    />
                    {answerOption.text}
                    <span className="form-check-sign"></span>
                  </Label>
                </div>
              </FormGroup>
            </>
          ))}
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
                      key={answerOption.id}
                      onChange={handleMultipleSelect}
                      type="checkbox"
                      name="exampleRadios"
                      value={answerOption.id}
                      id={answerOption.text}
                    />
                    {answerOption.text}
                    <span className="form-check-sign"></span>
                  </Label>
                </div>
              </FormGroup>
            </>
          ))}
        </form>
      );
    } else if (view === "DROPDOWN") {
      return (
        <form>
          <>
            <FormGroup>
              <Label for="exampleSelect1">Example select</Label>
              <Input
                type="select"
                name="select"
                onChange={handleSingleSelect}

                //id={answerOption.text}
                //value={answerOption.id}
                //onChange={handleSingleSelect}
              >
                {currentQuestion.responseOption.map((answerOption) => (
                  <option
                    key={answerOption.id}
                    id={answerOption.text}
                    value={answerOption.id}
                    //onChange={handleSingleSelect}
                  >
                    {answerOption.text}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </>
        </form>
      );
    } else {
    }
  })();

  //RENDER QUESTION
  const renderQuestion = (function() {
    if (currentQuestion) {
      return (
        <>
          <div>
            <h2>{currentQuestion.questionText}</h2>
            <br />
          </div>
        </>
      );
    }
  })();

  //RENDER PAGINATION
  const renderPagination = (function() {
    //INITIAL RENDITION
    if (pagination.current === 0) {
      return (
        <>
          <Pagination>
            <PaginationItem className="disabled">
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                Previous
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPagination({
                    previous: pagination.previous + 1,
                    current: pagination.current + 1,
                    next: pagination.next + 1,
                  });
                  handleSubmit();
                }}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      );
    } else if (pagination.current >= 1) {
      return (
        <>
          <Pagination>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPagination({
                    previous: pagination.previous - 1,
                    current: pagination.current - 1,
                    next: pagination.next - 1,
                  });
                }}
              >
                Previous
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPagination({
                    previous: pagination.previous + 1,
                    current: pagination.current + 1,
                    next: pagination.next + 1,
                  });
                  handleSubmit(e);
                }}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      );
    } else if (pagination.cuurent === questions.length) {
      return (
        <>
          <Pagination>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPagination({
                    previous: pagination.previous - 1,
                    current: pagination.current - 1,
                    next: pagination.next - 1,
                  });
                }}
              >
                Previous
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPagination({
                    previous: pagination.previous + 1,
                    current: pagination.current + 1,
                    next: pagination.next + 1,
                  });
                }}
              >
                Submit
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      );
    }
  })();

  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <Container>
        <blockquote className="blockquote">
          <h5 className="title">
            You may choose to leave the survey and return at another time.Your
            response will be saved and you can complete it later.
          </h5>
        </blockquote>
        {renderQuestion}

        {renderOption}
        <br />
        <nav aria-label="...">{renderPagination}</nav>
      </Container>
      <DemoFooter />
    </>
  );
}

export default SurveySession;

/*
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
*/

/*
<form>
          <>
            <FormGroup>
              <Label for="exampleSelect1">Example select</Label>
              <Input
                type="select"
                name="select"
                onChange={handleSingleSelect}

                //id={answerOption.text}
                //value={answerOption.id}
                //onChange={handleSingleSelect}
              >
                {currentQuestion.responseOption.map((answerOption) => (
                  <option
                    id={answerOption.text}
                    value={answerOption.id}
                    //onChange={handleSingleSelect}
                    key={answerOption.id}
                  >
                    {answerOption.text}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </>
        </form>
*/
