import DemoFooter from "components/Footers/DemoFooter.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React from "react";
// reactstrap components
import { Container } from "reactstrap";
import { UpdateProfilePage } from "views/user/UpdateProfilePage";

function ProfilePageUpdate() {
  //const [activeTab, setActiveTab] = React.useState("1");

  /*
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  */

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <UpdateProfilePage />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePageUpdate;
