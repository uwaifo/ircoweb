import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React, { useEffect, useState } from "react";
//import axios from "axios";
import { Container } from "reactstrap";
import { GetCurrentUser } from "../../helpers/getCurrentUser";
function SurveyQuestion() {
  const [currentUser, setSessionUser] = useState({});

  useEffect(() => {
    getCurrentUser();
  });
  const getCurrentUser = async () => {
    const user = await GetCurrentUser();
    setSessionUser(user);
    //console.log(currentUser);
  };

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

        <br />
        <nav aria-label="..."></nav>
      </Container>
      <DemoFooter />
    </>
  );
}

export default SurveyQuestion;
