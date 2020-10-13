import { Auth } from "aws-amplify";
import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import CompleteProfileModal from "components/Modal/CompleteProfile";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//import { GetCurrentUser, GetCurrentUserprofile } from "helpers/getCurrentUser";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Modal,
  Row,
} from "reactstrap";
import { EditProfilePage } from "views/user/EditProfilePage";
import { UpdateProfilePage } from "views/user/UpdateProfilePage";

//import { UpdateProfilePage } from "views/user/UpdateProfilePage";

function ProfilePage() {
  const userApi =
    "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user";
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});

  const [CompleteProfile, showCompleteProfile] = useState(false);

  const [EditProfile, showEditProfile] = useState(false);

  //TODO First we check that the user from Cognito
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      //console.log("user: ", user);

      const response = await fetch(`${userApi}/${data.username}`);
      const jsonResponse = await response.json();
      setUserProfile(jsonResponse);

      /*
      const data = await GetCurrentUser();
      const userInfo = await GetCurrentUserprofile(data);
      setUserProfile(userInfo);
      */

      //console.log("profile : ", jsonResponse);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  //TODO We then check that user profile data from the db/api

  const logout = () => {
    setUser({});
    Auth.signOut();
  };

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
        {(function() {
          if (userProfile.profileStatus === false) {
            return (
              <>
                <UpdateProfilePage
                  isOpen={CompleteProfile}
                  onChange={(arg) => {
                    showCompleteProfile(arg);
                  }}
                />
              </>
            );
          }
        })()}
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
                          {userProfile.firstName} {userProfile.lastName} <br />
                        </h4>
                        <h4>{userProfile.userRole}</h4>
                        <h6 className="description">{userProfile.email}</h6>
                      </div>
                    </div>
                    <Row>
                      <Col className="ml-auto mr-auto text-center" md="6">
                        <p>Address Information</p>
                        <br />
                        <Button
                          onClick={() => showEditProfile(true)}
                          //href="/editprofile"
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
                    <Modal
                      isOpen={EditProfile}
                      className="modal-lg"
                      modalClassName="bd-example-modal-lg"
                      toggle={() => showEditProfile(false)}
                    >
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLiveLabel">
                          Take a moment to update your profile{" "}
                        </h5>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => showEditProfile(false)}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditProfilePage
                          isOpen={EditProfile}
                          onChange={(arg) => {
                            showEditProfile(arg);
                          }}
                        />
                      </div>
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
                          <h3 className="title">
                            Oops ! You are not logged in.
                          </h3>
                        </CardTitle>
                        <CardText>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </CardText>

                        <Link to="/auth">
                          <Button color="primary">
                            Sign into your account
                          </Button>
                        </Link>
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
