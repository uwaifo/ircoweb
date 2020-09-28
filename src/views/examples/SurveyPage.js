import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  Container,
} from "reactstrap";
import { Auth } from "aws-amplify";

import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { Link } from "react-router-dom";

function SurveyPage() {
  const userApi =
    "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user";
  const url =
    "https://iddqyvacj6.execute-api.us-west-1.amazonaws.com/dev/questions";

  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [pendingQuestions, setQuestion] = useState([]);

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getQuestionFromApi();
  });

  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      // console.log("user: ", user);

      const response = await fetch(`${userApi}/${data.username}`);
      const jsonResponse = await response.json();
      setUserProfile(jsonResponse);

      //console.log("data: ", userInfo);
      //user = userInfo;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const getQuestionFromApi = async () => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    //console.log("data : ", jsonResponse);

    setQuestion(jsonResponse);
  };

  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <Container>
        {(function() {
          if (user.username) {
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
                    <Button href="/user/session/" color="success">
                      Take Survey
                    </Button>
                  </CardBody>
                </Card>
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
