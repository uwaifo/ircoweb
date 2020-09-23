import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React from "react";
// reactstrap components
import { Button, Col, Container, Row } from "reactstrap";
import { UpdateProfilePage } from "views/user/UpdateProfilePage";

function ProfilePage() {
  //const [activeTab, setActiveTab] = React.useState("1");

  /*
  const toggle = (tab) => {
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
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/joe-gardner-2.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Jane Faker <br />
              </h4>
              <h6 className="description">Music Producer</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                An artist of considerable range, Jane Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.
              </p>
              <br />
              <Button
                href="/editprofile"
                className="btn-round"
                color="default"
                outline
              >
                <i className="fa fa-cog" /> Update Profile
              </Button>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
