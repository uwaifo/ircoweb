import { Auth } from "aws-amplify";
import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

export const UpdateProfilePage = (props) => {
  //let today = new Date();
  //today = today.toLocaleDateString();
  const initialProfile = {
    firstName: "",
    lastName: "",
    address: {
      street: "",
      city: "",
      state: "",
    },

    phoneNumber: "",
    phoneType: "",
  };
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [isOpen, setIsOpen] = useState(true);

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
      <Modal
        className="modal-lg"
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Take a moment to complete your profile{" "}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
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
                    color="success"
                    size="lg"
                    onClick={updateUserProfile}
                  >
                    Update Profile
                  </Button>
                  &nbsp; &nbsp;
                  <Link to="#">
                    <Button size="lg" color="danger" onClick={closeModel}>
                      Skip for now
                    </Button>
                  </Link>{" "}
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>
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
