//import React from "react";
import DemoFooter from "components/Footers/DemoFooter";
import AuthForm from "components/Forms/AuthForm";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React from "react";
import { Card, Col, Container, Row } from "reactstrap";

function AuthenticationPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/twobythebeach.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <AuthForm />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default AuthenticationPage;
