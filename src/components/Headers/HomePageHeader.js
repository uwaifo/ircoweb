import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function HomePageHeader() {
  const [isOpen, setOpen] = useState(false);

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

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="L61p2uyiMSo"
        onClose={() => setOpen({ isOpen: false })}
      />
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
            <h1>Welcome</h1>
            <h3>Welcome to Retirement Resort of Florida .</h3>
            <br />

            <Link>
              <Button
                onClick={openModal}
                className="btn-round mr-1"
                color="neutral"
                target="_blank"
                outline
              >
                <i className="btn-round" />
                Watch a video
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}

export default HomePageHeader;
