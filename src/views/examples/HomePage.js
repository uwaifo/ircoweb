import React from "react";
import DemoFooter from "components/Footers/DemoFooter.js";
import HomePageHeader from "components/Headers/HomePageHeader.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function HomePage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <HomePageHeader />
      <div className="main"></div>
      <DemoFooter />
    </>
  );
}

export default HomePage;
