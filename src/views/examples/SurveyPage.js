import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";

import DemoFooter from "components/Footers/DemoFooter.js";
import UserSurveyForm from "components/Forms/UserSurveyForm";

function SurveyPage() {
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />

      <UserSurveyForm />

      <DemoFooter />
    </>
  );
}

export default SurveyPage;
