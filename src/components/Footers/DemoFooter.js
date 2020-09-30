import { PrivacyPolicyText } from "components/PrivacyPolicy";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { Container, Modal, Row } from "reactstrap";

function DemoFooter() {
  const [showPolicy, setShowPolicy] = useState(false);

  //const handlePolicy = () => {};
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <div>Follow us on social media</div>
        <Row>
          <SocialIcon url="http://facebook.com/in/jaketrent" />
          &nbsp;
          <SocialIcon url="http://twitter.com/in/jaketrent" />
          &nbsp;
          <SocialIcon url="http://youtube.com/in/jaketrent" />
          &nbsp;
          <SocialIcon url="http://instagram.com/in/jaketrent" />
          {/*<nav className="footer-nav">
            <ul>
              <li>
                <Link to="/user/profile">Profile</Link>
              </li>
              <li>
                <Link to="/auth" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>*/}
          <Modal
            isOpen={showPolicy}
            className="modal-lg"
            modalClassName="bd-example-modal-lg"
            toggle={() => setShowPolicy(false)}
          >
            {" "}
            <div className="modal-header">
              <h4 className="modal-title" id="myLargeModalLabel">
                Privacy Policy for Vero Beach Retirement Resort of Florida
              </h4>
              <div>{PrivacyPolicyText}</div>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setShowPolicy(false)}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">...</div>
          </Modal>
          <div className="credits ml-auto">
            <span className="">
              © {new Date().getFullYear()}, Vero Beach Retirement Resort of
              Florida |{" "}
              <Link to="#" onClick={() => setShowPolicy(true)}>
                Privacy Policy
              </Link>{" "}
              | <Link to="/contact">Contact</Link>
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
