import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
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
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="/admin">Dashboard</a>
              </li>
              <li>
                <a onClick={logout} href="/user/profile">
                  Profile
                </a>
              </li>
              <li>
                <a href="/auth">Logout</a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Creative Tim & Uwaifo
              Idehenre
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
