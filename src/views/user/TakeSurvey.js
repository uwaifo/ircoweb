import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Container,
  FormGroup,
  Label,
  Input,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
//LOCAL IMPORTS
import { GetCurrentUser, GetCurrentUserprofile } from "helpers/getCurrentUser";
import { GetAllQuestions } from "helpers/getAllQuestions";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { SendSelectedResponse } from "helpers/sendUserResponse";
import { UpdateSurveyStatus } from "helpers/userSurveyStatus";
import { PreSubmitCheck } from "helpers/preSubmitCheck";

function TakeSurvey() {
  //INITIAL STATES
  let tempResponse = [];
  let selected = [];
  let newResponse = {
    questionId: "",
    userId: "",
    response: [],
  };
  let statusObject = {
    userId: "",
    surveyStatus: "",
  };
  //STATES
  const [userProfile, setUserProfile] = useState({});
  const [Questions, setQuestions] = useState([]);
  const [questNumber, setQuestNumber] = useState(0);
  const [ShowQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    Questions[questNumber]
  );
  const [userResponse, setUserResponse] = useState(tempResponse);
  const [checkedItems, setCheckedItems] = useState({});
  const [surveyProgress, setSurveyProgress] = useState(0);
  const [existingQuestion, checkExistingQuestion] = useState(false);

  //SORT THE QUSTIONS BY SEQUENCE NUMBER
  Questions.sort(
    (a, b) => parseInt(a.sequenceNumber) - parseInt(b.sequenceNumber)
  );

  //USE EFFECT TO INIT SOME STATES
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getQuestionFromApi();
  }, []);
  useEffect(() => {
    presentQuestion();
  });
  useEffect(() => {
    stackResponse();
  });

  useEffect(() => {
    checkIfAttempted();
  });

  useEffect(() => {
    // console.log("checkedItems: ", checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    //console.log("survey position : ", surveyProgress);
  }, [surveyProgress]);

  //USE EFFECT FUNCTIONS
  async function checkUser() {
    try {
      const data = await GetCurrentUser();
      const userInfo = await GetCurrentUserprofile(data);
      setUserProfile(userInfo);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function getQuestionFromApi() {
    try {
      const data = await GetAllQuestions();
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  }

  function presentQuestion() {
    setCurrentQuestion(Questions[questNumber]);
  }

  async function checkIfAttempted() {
    //PREFLIGHT CHECK

    try {
      const checkResponse = await PreSubmitCheck(
        userProfile.userId,
        currentQuestion.questionId
      );
      checkExistingQuestion(checkResponse);
    } catch (error) {
      console.log(error);
    }
  }

  function stackResponse() {
    //setUserResponse(tempResponse);
  }

  //TRIGGERS

  function handlePrevious() {
    setQuestNumber(questNumber - 1);
    setSurveyProgress(questNumber);
  }
  async function handleNext() {
    //tempResponse.push(newResponse);
    if (currentQuestion.questionType === "MULTIPLE-CHOICE") {
      handleCheckBox();
    }
    tempResponse.push(newResponse);

    /*const eligibleInput = await PreSubmitCheck(
      newResponse.userId,
      newResponse.questionId
    );
        console.log("IS VALID : ", eligibleInput);

    */

    console.log("IS VALID : ", existingQuestion);
    if (existingQuestion) {
      await SendSelectedResponse(newResponse);
      console.log("new : ", newResponse);

      //setQuestNumber(questNumber + 1);
      //Now we update your progress in the db

      if (currentQuestion.sequenceNumber === Questions.length) {
        statusObject = {
          userId: userProfile.userId,
          surveyStatus: "COMPLETE",
        };
        await UpdateSurveyStatus(statusObject);
        //console.log("Competed Survey");
      }
      if (currentQuestion.sequenceNumber === 1) {
        statusObject = {
          userId: userProfile.userId,
          surveyStatus: "IN-PROGRESS",
        };
        await UpdateSurveyStatus(statusObject);
        // console.log("Survey in progress");
      }
    }

    setQuestNumber(questNumber + 1);
    setSurveyProgress(questNumber);

    //setUserResponse(tempResponse);

    //props.nextOne(question.sequenceNumber + 1);
  }

  function handleInputText(e) {
    e.persist();
    console.log(e.target.value);
    newResponse = {
      questionId: currentQuestion.questionId,
      userId: userProfile.userId,
      response: [e.target.value],
    };
    //console.log(newResponse);
  }

  async function handleSingleSelect(e) {
    e.persist();
    console.log(e.target.value);
    newResponse = {
      questionId: currentQuestion.questionId,
      userId: userProfile.userId,
      response: [e.target.value],
    };
  }

  function handleMultipleSelect(e) {
    // e.persist();
    setCheckedItems({ ...checkedItems, [e.target.id]: e.target.checked });
  }

  function handleCheckBox() {
    for (const key in checkedItems) {
      if (checkedItems[key] === true) {
        selected.push(key);
        //selected.push(checkedItems[key]);
      }
    }
    newResponse = {
      questionId: currentQuestion.questionId,
      userId: userProfile.userId,
      response: selected,
    };
  }

  //RENDITIONS
  //RENDER QUESTION STATEMENT
  const RenderQuestionStatement = () => {
    return (
      <>
        {existingQuestion ? (
          <>
            {/*<Badge color="success" pill>
              Pending Submission
            </Badge>{" "}
            */}
          </>
        ) : (
          <>
            <img
              alt="..."
              width="40"
              height="40"
              src={require("assets/img/completed_one.png")}
            />
            {/*
            <Badge color="warning" pill>
              You have responded to this question already.
            </Badge>{" "}*/}
          </>
        )}
        <div>
          <h2>{currentQuestion.questionText}</h2>

          <br />
        </div>
      </>
    );
  };

  //RENDER QUESTION OPTIONS
  const RenderQuestionOptions = () => {
    return (
      <>
        {currentQuestion ? (
          <>
            {(function() {
              if (currentQuestion.questionType === "INPUT") {
                return (
                  <>
                    <form>
                      <FormGroup>
                        <Input
                          type="text"
                          name="password"
                          autoComplete="off"
                          id={currentQuestion.text}
                          onChange={handleInputText}
                        />
                      </FormGroup>
                    </form>
                  </>
                );
              } else if (currentQuestion.questionType === "SINGLE-CHOICE") {
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
              } else if (currentQuestion.questionType === "MULTIPLE-CHOICE") {
                return (
                  <form>
                    {currentQuestion.responseOption.map((answerOption) => (
                      <>
                        <FormGroup key={answerOption.id}>
                          <div className="form-check">
                            <Label className="form-check-label">
                              <Input
                                onChange={handleMultipleSelect}
                                type="checkbox"
                                name={answerOption.id}
                                value={answerOption.id}
                                id={answerOption.id}
                                checked={checkedItems[answerOption.id]}
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
              } else if (currentQuestion.questionType === "DROPDOWN") {
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
                          {currentQuestion.responseOption.map(
                            (answerOption) => (
                              <option
                                id={answerOption.text}
                                value={answerOption.id}
                                //onChange={handleSingleSelect}
                                key={answerOption.id}
                              >
                                {answerOption.text}
                              </option>
                            )
                          )}
                        </Input>
                      </FormGroup>
                    </>
                  </form>
                );
              }
            })()}
            <>
              <Pagination>
                {(function() {
                  if (questNumber > 1) {
                    return (
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrevious();
                          }}
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else {
                    //currentQuestion.sequenceNumber
                    return (
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                })()}
                &nbsp; &nbsp;
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  };

  //
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <Container>
        {(function() {
          if (userProfile.userId) {
            return (
              <>
                <Card>
                  <CardHeader>
                    {/*<h2 className="title">
                      Hello {userProfile.firstName} {userProfile.lastName} !
                    </h2>*/}
                    <h3 className="title">
                      Please Give Us A Moment Of Your time.
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <h4 className="title">
                      Help us serve you better by taking a survey . This way we
                      get to know you better and do more for you.
                    </h4>
                    <Button
                      color="danger"
                      onClick={() => {
                        setShowQuestion(true);
                      }}
                    >
                      Take Survey
                    </Button>{" "}
                  </CardBody>
                </Card>
                <Modal
                  isOpen={ShowQuestion}
                  className="modal-lg"
                  modalClassName="bd-example-modal-lg"
                  toggle={() => setShowQuestion(false)}
                >
                  {" "}
                  <div className="modal-header">
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => setShowQuestion(false)}

                      //onClick={() => setLiveDemo(false)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                    <h3>Retirement Survey</h3>

                    <hr />
                    <Container className="align-content-start text-left">
                      {(function() {
                        if (userProfile.surveyStatus === "COMPLETE") {
                          return (
                            <>
                              <h5
                                className="modal-title"
                                id="myLargeModalLabel"
                              >
                                You have already participated in the survey.
                              </h5>
                            </>
                          );
                        } else if (
                          currentQuestion &&
                          userProfile !== "COMPLETE"
                        ) {
                          return (
                            <>
                              <RenderQuestionStatement />
                              <RenderQuestionOptions />

                              <h5>
                                {" "}
                                Question {
                                  currentQuestion.sequenceNumber
                                } of {Questions.length}
                              </h5>
                              <hr />
                              <h5
                                className="modal-title"
                                id="myLargeModalLabel"
                              >
                                You may choose to leave the survey and return at
                                another time.Your response will be saved and you
                                can complete it later.
                              </h5>
                            </>
                          );
                        } else {
                          //props.nextOne(nextQuestion);

                          return (
                            <>
                              <h1>Thank you</h1>
                              <h2>You have completed the survey.</h2>

                              <blockquote className="blockquote">
                                <p className="mb-0">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Integer posuere erat a ante.
                                </p>
                              </blockquote>
                            </>
                          );
                        }
                      })()}
                    </Container>
                  </div>
                </Modal>
              </>
            );
          } else {
            return (
              <>
                <Card>
                  <CardBody>
                    <CardTitle>
                      {" "}
                      <h3 className="title">Oops ! You are not logged in.</h3>
                    </CardTitle>
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
                    <Link to="/auth">
                      <Button color="primary">Sign into your account</Button>
                    </Link>
                  </CardBody>
                </Card>
              </>
            );
          }
        })()}
      </Container>
      <DemoFooter />
    </>
  );
}

export default TakeSurvey;
//https://stackoverflow.com/questions/56273038/how-to-implement-multiple-checkbox-using-react-hook
