import { Auth } from "aws-amplify";
import axios from "axios";
import { GetCurrentUserprofile } from "helpers/getCurrentUser";
import { GetCurrentUser } from "helpers/getCurrentUser";
import ListStates from "helpers/listStates";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

export const EditProfilePage = (props) => {
  //let today = new Date();
  //today = today.toLocaleDateString();

  const [userProfile, setUserProfile] = useState({});
  const [isOpen, setIsOpen] = useState(props.isOpen);
  console.log("MODAL IS : ", isOpen);
  //const [address, setAddress] = useState(initialProfile.address);
  //const [submitted, setSubmitted] = useState(false);

  /*async function getUser() {
    try {
      const userData = GetCurrentUser;
      const updateUrl = `https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/${userData.username}`;
    } catch (error) {
      console.log(error);
    }
  }*/
  useEffect(() => {
    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUser() {
    try {
      const data = await GetCurrentUser();
      const userInfo = await GetCurrentUserprofile(data);
      setUserProfile(userInfo);
    } catch (err) {
      console.log("error: ", err);
    }
  }
  async function updateUserProfile() {
    try {
      const userData = await Auth.currentUserPoolUser();
      //const userInfo = { userId: userData.username, ...userData.attributes };
      const updateUrl = `https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/${userData.username}/profile`;

      console.log(updateUrl);
      const updateResponse = await axios.patch(updateUrl, userProfile);

      //const jsonUpdateResponse = await updateResponse.json();
      console.log(updateResponse);
      closeModel();
      //closeModel();
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(e) {
    e.persist();

    if (
      e.target.name === "state" ||
      e.target.name === "city" ||
      e.target.name === "street"
    ) {
      setUserProfile({
        ...userProfile,
        address: {
          ...userProfile.address,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setUserProfile({
        ...userProfile,
        [e.target.name]: e.target.value,
      });
    }

    console.log(userProfile);
  }

  function closeModel() {
    setIsOpen(false);

    props.onChange(isOpen);
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
                      value={userProfile.firstName}
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
                      value={userProfile.lastName}
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
                      value={userProfile.phoneNumber}
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
                      value={userProfile.phoneType}
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
                      //value={JSON.stringify(userProfile.address["street"])}
                      name="street"
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
                      //value={userProfile.address.state}
                      name="state"
                      id="exampleSelect1"
                      onChange={onChange}
                    >
                      <ListStates />
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
                      placeholder="Your City"
                      type="text"
                      name="city"
                      //value={userProfile.address.city}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Button
                className="btn-fill"
                color="success"
                size="lg"
                onClick={updateUserProfile}
              >
                Update Profile
              </Button>
              &nbsp; &nbsp;
              <Link to="#">
                <Button size="lg" color="danger" onClick={closeModel}>
                  Skip for now {isOpen}
                </Button>
              </Link>{" "}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
/*

/*
{
"address": {
    "street": "Home addres o", 
    "city": "Abuja", 
    "state": "Alaska - AK"
    
},
"firstName": "Uwaifo",
"lastName": "Idehenre",
"phoneNumber": "8083862828",
"phoneType": "Land Line"
}
*/
