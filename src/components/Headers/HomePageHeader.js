import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function HomePageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/twobythebeach.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Welcome Home</h1>
            <h3>Welcome to Indian Retirement Resort of Florida .</h3>
            <br />

            <Link to="/auth">
              <Button
                className="btn-round mr-1"
                color="neutral"
                target="_blank"
                outline
              >
                <i className="btn-round" />
                register
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                className="btn-round"
                color="neutral"
                type="button"
                outline
              >
                Login
              </Button>
            </Link>

            <Link color="primary" to="/user/survey">
              <Button
                //href="/user/survey"
                className="btn-round"
                color="neutral"
                type="button"
                outline
              >
                {" "}
                Survey{" "}
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}

export default HomePageHeader;
