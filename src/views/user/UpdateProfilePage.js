import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { GetCurrentUser } from "../../helpers/getCurrentUser";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import axios from "axios";

export const UpdateProfilePage = () => {
  let today = new Date();
  today = today.toLocaleDateString();
  const initialProfile = {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    phoneType: "",
    city: "",
    state: "",
  };
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [submitted, setSubmitted] = useState(false);

  /*async function getUser() {
    try {
      const userData = GetCurrentUser;
      const updateUrl = `https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/${userData.username}`;
    } catch (error) {
      console.log(error);
    }
  }*/
  async function updateUserProfile() {
    try {
      const userData = await Auth.currentUserPoolUser();
      //const userInfo = { userId: userData.username, ...userData.attributes };
      const updateUrl = `https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/${userData.username}/profile`;

      console.log(updateUrl);
      const updateResponse = await axios.patch(updateUrl, userProfile);
      //const jsonUpdateResponse = await updateResponse.json();
      console.log(updateResponse);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(e) {
    e.persist();
    setUserProfile(() => ({ ...userProfile, [e.target.name]: e.target.value }));
    console.log(userProfile);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form className="contact-form">
              <Row>
                <Col md="6">
                  <label>First Name</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="firstName"
                      placeholder="Name"
                      type="text"
                      onChange={onChange}
                    />
                  </InputGroup>
                </Col>
                <Col md="6">
                  <label>Last Name</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      onChange={onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Phone Number</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="phoneNumber"
                      placeholder="Name"
                      type="text"
                      onChange={onChange}
                    />
                  </InputGroup>
                </Col>

                <Col md="6">
                  <label>Phone Type</label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="phoneType"
                      id="exampleSelect1"
                      onChange={onChange}
                    >
                      <option>Mobile</option>
                      <option>Land Line</option>
                    </Input>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <label>Home Address</label>
                  <InputGroup>
                    <Input
                      type="textarea"
                      name="address"
                      id="exampleText"
                      onChange={onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <label>State </label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="state"
                      id="exampleSelect1"
                      onChange={onChange}
                    >
                      <option>Alabama - AL</option>
                      <option>Alaska - AK</option>
                      <option>Arizona - AZ</option>
                    </Input>
                  </InputGroup>
                </Col>

                <Col md="6">
                  <label>City</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-world-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name"
                      type="text"
                      name="city"
                      onChange={onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Button
                className="btn-fill"
                color="danger"
                size="lg"
                onClick={updateUserProfile}
              >
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
