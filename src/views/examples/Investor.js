import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import InvestorPageHeader from "components/Headers/InvestorPageHeader";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React from "react";
// reactstrap components
import { Col, Container, Row } from "reactstrap";

function InvestorPage() {
  //const [activeTab, setActiveTab] = React.useState("1");

  /*const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  */

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
      {/*<ProfilePageHeader />*/}
      <InvestorPageHeader />
      {/*<LandingPageHeader />*/}

      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Your Investment Plans</h2>
                <h5 className="description">
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn't scroll to get here. Add a button if you
                  want the user to see more.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
          </Container>
        </div>
      </div>

      <DemoFooter />
    </>
  );
}

export default InvestorPage;
