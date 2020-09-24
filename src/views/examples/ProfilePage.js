import { Auth } from "aws-amplify";
import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

//import { UpdateProfilePage } from "views/user/UpdateProfilePage";

function ProfilePage() {
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [user, setUser] = useState({});
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      console.log("user: ", user);

      //console.log("data: ", userInfo);
      //user = userInfo;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const logout = () => {
    setUser({});
    Auth.signOut();
  };
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
            {(function() {
              if (user.username) {
                return (
                  <>
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
                          Jane Faker {user.username} <br />
                        </h4>
                        <h6 className="description">Music Producer</h6>
                      </div>
                    </div>
                    <Row>
                      <Col className="ml-auto mr-auto text-center" md="6">
                        <p>
                          An artist of considerable range, Jane Faker — the name
                          taken by Melbourne-raised, Brooklyn-based Nick Murphy
                          — writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure.
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
                        <br />
                        <p />
                        <Button
                          onClick={logout}
                          className="btn-round"
                          color="default"
                          outline
                        >
                          Logout
                        </Button>
                      </Col>
                    </Row>
                  </>
                );
              } else {
                return (
                  <>
                    <Card>
                      <CardImg top src="img-src" alt="..." />
                      <CardBody>
                        <CardTitle>
                          {" "}
                          <h3 className="title">
                            Oops ! You are not logged in.
                          </h3>
                        </CardTitle>
                        <CardText>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </CardText>
                        <Button href="/auth" color="primary">
                          Register an account
                        </Button>
                      </CardBody>
                    </Card>
                  </>
                );
              }
            })()}
          </div>

          <br />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
