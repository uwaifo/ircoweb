import DemoFooter from "components/Footers/DemoFooter.js";
import HomePageHeader from "components/Headers/HomePageHeader.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import React from "react";

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
      <div className="main">Content Here</div>
      <DemoFooter />
    </>
  );
}

export default HomePage;
