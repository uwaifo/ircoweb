import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
function RenderQuestionOptions(props) {
  const { question, user } = props;
  const initialResponse = {
    questionId: "",
    userId: "",
    response: [],
  };
  const [tempResponse, setTempResponse] = useState([]);

  const [responseOption, setResponseOption] = useState(initialResponse);

  useEffect(() => {
    getUpdates();
  }, []);

  async function getUpdates() {
    setResponseOption({
      questionId: question.questionId,
      userId: user.userId,
      //response: [e.target.value],
    });
  }
  async function handleNext() {
    //Append response to temp store
    //setTempResponse();
    await tempResponse.push(responseOption);

    console.log("TEMP : ", tempResponse);

    //console.log("SENDING : ", responseOption);
    //await SendSelectedResponse(responseOption);
    //console.log("NEXT QUESTION : ", question.sequenceNumber + 1);
    await props.nextOne(question.sequenceNumber + 1);

    //setResponseOption(initialResponse);
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
  //console.log(responseOption);

  async function handleMultipleSelect(e) {
    e.persist();
    //

    setResponseOption({
      questionId: question.questionId,
      userId: user.userId,
      response: [e.target.value],
    });
    console.log(responseOption);
    //console.log(e.target.id);
  }

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
}

export default RenderQuestionOptions;
