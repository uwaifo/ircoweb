import React from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal } from "reactstrap";
import { UpdateProfilePage } from "../../views/user/UpdateProfilePage";
function CompleteProfieModal() {
  const [liveDemo, setLiveDemo] = React.useState(true);
  return (
    <>
      <Modal
        className="modal-lg"
        isOpen={liveDemo}
        toggle={() => setLiveDemo(false)}
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
            onClick={() => setLiveDemo(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <UpdateProfilePage />
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={() => setLiveDemo(false)}
            >
              Never mind
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={() => setLiveDemo(false)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CompleteProfieModal;
