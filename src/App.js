// styles
import "assets/css/bootstrap.min.css";
import "assets/demo/demo.css?v=1.2.0";
import "assets/scss/paper-kit.scss?v=1.2.0";
import ListQuestions from "components/DashBoard/ListQuestions";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AboutPage from "views/examples/AboutPage";
import AdminQuestioons from "views/examples/AdminQuestioons";
import CommunityPage from "views/examples/CommunityPage";
//import DashBoard from "views/examples/DashBoard";
import HomePage from "views/examples/HomePage";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage";
import ProfilePage from "views/examples/ProfilePage.js";
//import ProfilePageUpdate from "views/examples/ProfilePageUpdate.js";

import RegisterPage from "views/examples/RegisterPage.js";
import SurveyPage from "views/examples/SurveyPage";
import UserSurveyPage from "views/user/UserSurveyPage";
// pages
import Index from "views/Index.js";
import { UpdateProfilePage } from "views/user/UpdateProfilePage";
// others
import AuthenticationPage from "./views/examples/AuthenticationPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Page Routes */}
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
        <Route path="/about" render={(props) => <AboutPage {...props} />} />
        <Route
          path="/community"
          render={(props) => <CommunityPage {...props} />}
        />
        {/* User Routes */}
        <Route
          path="/user/profile"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route path="/user/survey" component={SurveyPage} />
        <Route path="/user/survey/:id" component={UserSurveyPage} />
        {/* 
        <Route path="/update-profile" render={(props) => <UpdateProfilePage {...props} />}/>
        <Route path="/editprofile" component={ProfilePageUpdate} />
        */}

        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route path="/auth" component={AuthenticationPage} />

        {/* Dashboard Routes */}
        {/*<Route path="/dashboard" component={DashBoard} />*/}
        <Route path="/admin/questions" component={AdminQuestioons} />
        <Route path="/questions" component={ListQuestions} />

        {/* User Routes */}

        <Route
          path="/update-profile"
          render={(props) => <UpdateProfilePage {...props} />}
        />

        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/register"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
//cpl45198@eoopy.com
//vut92780@eoopy.com

/*
{
  "address": {
    "city": "Jacksonville",
    "line1": "202 Avenue Mall",
    "state": "AZIN",
    "zip": "54075"
  },
  "dateCreated": "09/14/2020",
  "email": "irrofflorida@gmail.com",
  "firstName": "Anand",
  "lastName": "Vikash",
  "phoneNumber": "9043049862",
  "phoneType": "Mobile",
  "surveyStatus": "NOT-STARTED",
  "userId": "65cc21bf-2aee-4cd7-9324-2e7a1d54bb2b",
  "lastLoggedIn":"09/19/2020"
}

*/
