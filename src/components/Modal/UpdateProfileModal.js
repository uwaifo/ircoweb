import React from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";
import { UpdateProfilePage } from "../../views/user/UpdateProfilePage";
function UpdateProfileModal() {
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
          <UpdateProfilePage
            isOpen={liveDemo}
            onChange={(arg) => {
              setLiveDemo(arg);
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default UpdateProfileModal;
