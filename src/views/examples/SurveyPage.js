import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import CurrentQuestionModal from "components/Modal/CurrentQuestion";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { GetAllQuestions } from "helpers/getAllQuestions";
import { GetCurrentUser, GetCurrentUserprofile } from "helpers/getCurrentUser";
import React, { useEffect, useState } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Container,
  Modal,
} from "reactstrap";

//GLOBAL STATE
const initialState = { count: 0 };
function SurveyPage() {
  const currentQuestionState = {
    previous: -1,
    current: 0,
    next: 1,
  };
  //const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [Questions, setQuestions] = useState([]);
  const [questNumber, setQuestNumber] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(
    Questions[questNumber]
  );

  const [openQuestionModal, setOpenModal] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  Questions.sort(
    (a, b) => parseInt(a.sequenceNumber) - parseInt(b.sequenceNumber)
  );
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

  function presentQuestion() {
    setCurrentQuestion(Questions[questNumber]);
  }

  function handleNext(newValue) {
    setQuestNumber(newValue);
    //setCurrentQuestion(Questions[questNumber]);
    console.log("SP :", newValue);
  }

  async function checkUser() {
    //await setUserProfile(GetCurrentUserprofile);
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

  //console.log(userProfile);
  //console.log(Questions);
  //console.log(openQuestionModal);
  //console.log(currentQuestion);

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
                    <h2 className="title">
                      Hello {userProfile.firstName} {userProfile.lastName} !
                    </h2>
                    <h3 className="title">
                      Please Give Us A Moment Of Your time.
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <h4 className="title">
                      Help us serve you better by taking a survey . This way we
                      get to know you better and do more for you.
                    </h4>
                    <Link to="/user/session/">
                      <Button color="success">Take Survey</Button>
                    </Link>
                    &nbsp;
                    <Button color="danger" onClick={() => setShowPolicy(true)}>
                      Test Survey
                    </Button>{" "}
                    <h4>{Questions.length}</h4>
                  </CardBody>
                </Card>
                <Modal
                  isOpen={showPolicy}
                  className="modal-lg"
                  modalClassName="bd-example-modal-lg"
                  toggle={() => setShowPolicy(false)}
                >
                  {" "}
                  <div className="modal-header">
                    <CurrentQuestionModal
                      count={Questions.length}
                      question={currentQuestion}
                      user={userProfile}
                      nextOne={handleNext}
                      currentQuestion={currentQuestion}
                    />
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => setShowPolicy(false)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <div className="modal-body">...</div>
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

export default SurveyPage;
