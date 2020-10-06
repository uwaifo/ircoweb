import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Container,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

function CurrentQuestionModal(props) {
  const initialResponse = {
    questionId: "",
    userId: "",
    response: [],
  };

  const [responseOption, setResponseOption] = useState(initialResponse);
  const [newResp, setNewResp] = useState({});
  const [tempResponse, setTempResponse] = useState([]);
  const [largeModal, setLargeModal] = React.useState(props.open);
  const { question, user, open, currentQuestion } = props;

  //const qu = JSON.stringify(question);

  const [nextQuestion, setNextQuestion] = useState();

  //////////

  /////

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);
  async function newQuestion() {
    await setNextQuestion(question.sequenceNumber + 1);
  }

  function handleInputText(e) {
    //e.persist();

    setNewResp({
      questionId: question.questionId,
      userId: user.userId,
      response: [e.target.value],
    });
    console.log(e.target.id);
  }

  async function handleSingleSelect(e) {
    e.persist();

    setResponseOption({
      questionId: question.questionId,
      userId: user.userId,
      response: [e.target.value],
    });

    console.log(responseOption);
    //console.log(e.target.id);
  }
  console.log(responseOption);

  async function handleMultipleSelect(e) {
    e.persist();

    /*setResponseOption({
      questionId: question.questionId,
      userId: user.userId,
      response: [e.target.value],
    });
    */
    console.log(responseOption);
  }
  function handleNext() {
    tempResponse.push(newResp);
    console.log("TEMP : ", tempResponse);
    props.nextOne(question.sequenceNumber + 1);
  }

  const RenderQuestionStatement = () => {
    return (
      <>
        <div>
          <h2>{question.questionText}</h2>

          <br />
        </div>
      </>
    );
  };

  const RenderQuestionOptions = () => {
    return (
      <>
        {question ? (
          <>
            {(function() {
              if (question.questionType === "INPUT") {
                return (
                  <>
                    <form>
                      <FormGroup>
                        <Input type="text" name="password" autoComplete="off" />
                      </FormGroup>
                    </form>
                  </>
                );
              } else if (question.questionType === "SINGLE-CHOICE") {
                return (
                  <form>
                    {question.responseOption.map((answerOption) => (
                      <>
                        <FormGroup key={answerOption.id}>
                          <div className="form-check-radio">
                            <Label className="form-check-label">
                              <Input
                                key={answerOption.id}
                                type="radio"
                                onChange={handleInputText}
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
              } else if (question.questionType === "MULTIPLE-CHOICE") {
                return (
                  <form>
                    {question.responseOption.map((answerOption) => (
                      <>
                        <FormGroup key={answerOption.id}>
                          <div className="form-check">
                            <Label className="form-check-label">
                              <Input
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
              } else if (question.questionType === "DROPDOWN") {
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
                          {question.responseOption.map((answerOption) => (
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
                );
              }
            })()}
            <>
              <Pagination>
                <PaginationItem className="disabled">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>

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

  return (
    <>
      <Container className="align-content-start text-left">
        <h2>{largeModal}</h2>
        {(function() {
          if (question) {
            return (
              <>
                <h5 className="modal-title" id="myLargeModalLabel">
                  You may choose to leave the survey and return at another
                  time.Your response will be saved and you can complete it
                  later.
                </h5>
                <RenderQuestionStatement />
                <RenderQuestionOptions
                  question={question}
                  user={user}
                  nextOne={handleNext}
                />
                <h5>
                  {" "}
                  {user.firstName} Attempting question {question.sequenceNumber}{" "}
                  of {props.count}
                </h5>
              </>
            );
          } else {
            //props.nextOne(nextQuestion);

            return (
              <>
                <p>Loading...</p>
                <h1>Thank you</h1>
                <h2>You have completed the survey.</h2>

                <blockquote className="blockquote">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                </blockquote>
              </>
            );
          }
        })()}
      </Container>
    </>
  );
}

export default CurrentQuestionModal;

//https://webomnizz.com/change-parent-component-state-from-child-using-hooks-in-react/
