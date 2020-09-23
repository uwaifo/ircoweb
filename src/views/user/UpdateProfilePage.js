import React from "react";
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

export const UpdateProfilePage = () => {
  return (
    <>
      <div className="section landing-section">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="text-center">
                Take a moment to update your profile{" "}
              </h2>
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
                      <Input placeholder="Name" type="text" />
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
                      <Input placeholder="Email" type="text" />
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
                      <Input placeholder="Name" type="text" />
                    </InputGroup>
                  </Col>

                  <Col md="6">
                    <label>Phone Type</label>
                    <InputGroup>
                      <Input type="select" name="select" id="exampleSelect1">
                        <option>Mobile</option>
                        <option>Land Line</option>
                      </Input>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <label>State </label>
                    <InputGroup>
                      <Input type="select" name="select" id="exampleSelect1">
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
                      <Input placeholder="Name" type="text" />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="ml-auto mr-auto" md="4">
                    <Button className="btn-fill" color="danger" size="lg">
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
