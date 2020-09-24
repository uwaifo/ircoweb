import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";

function UserSurveyPage() {
  const url =
    "https://iddqyvacj6.execute-api.us-west-1.amazonaws.com/dev/questions";

  const [question, setQuestion] = useState([]);

  useEffect(() => {
    getQuestionFromApi();
  });

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
        <Card>
          <CardHeader>
            <h2 className="title">Please Give Us A Moment Of Your time.</h2>
          </CardHeader>
          <CardBody>
            <h4 className="title">
              Help us server you bette by taking a survey . This we we get to
              know you better and do more for you.
            </h4>
            <Button href="/user/survey/" color="success">
              Take Survey
            </Button>
          </CardBody>
        </Card>
      </Container>

      <DemoFooter />
    </>
  );
}

export default UserSurveyPage;
