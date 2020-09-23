import ListQuestions from "components/DashBoard/ListQuestions";
import DemoFooter from "components/Footers/DemoFooter";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React from "react";
import { Container } from "reactstrap";

function AdminQuestioons() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />

      <div className="main">
        <div className="section text-center">
          <Container>
            <ListQuestions />
          </Container>
        </div>
      </div>

      <DemoFooter />
    </>
  );
}

export default AdminQuestioons;
