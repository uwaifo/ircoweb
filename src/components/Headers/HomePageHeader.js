import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import { Modal } from "reactstrap";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function HomePageHeader() {
  const [isOpen, setOpen] = useState(false);
  const [largeModal, setLargeModal] = React.useState(false);

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

  /*function openModal() {
    setOpen(true);
  }*/

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

            <Link to="#">
              <Button
                onClick={() => setLargeModal(true)}
                //onClick={openModal}
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
          <Modal
            isOpen={largeModal}
            className="modal-lg"
            modalClassName="bd-example-modal-lg"
            toggle={() => setLargeModal(false)}
          >
            <div className="modal-header">
              <h4 className="modal-title" id="myLargeModalLabel">
                Video comming soon.
              </h4>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setLargeModal(false)}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">...</div>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default HomePageHeader;
