import React from "react";
import * as Survey from "survey-react";
//import "../surveypage.css";
import "../../surveypage.css";
import "survey-react/survey.css";

class UserSurveyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }
  onCompleteComponent() {
    this.setState({ isCompleted: true });
  }
  render() {
    let json = {
      title: "Survey Title&Logo demo",
      description:
        "Please take look at the survey title and logo. Test the settings on the right panel ->",
      logo: "https://surveyjs.io/favicon.ico",
      logoWidth: 60,
      logoHeight: 60,
      //
      showProgressBar: "bottom",
      showTimerPanel: "top",
      maxTimeToFinishPage: 10,
      maxTimeToFinish: 25,
      firstPageIsStarted: true,
      startSurveyText: "Start Quiz",
      //
      pages: [
        {
          questions: [
            {
              type: "html",
              html:
                "You are about to start quiz by history. <br/>You have 10 seconds for every page and 25 seconds for the whole survey of 3 questions.<br/>Please click on <b>'Start Quiz'</b> button when you are ready.",
            },
          ],
        },

        {
          questions: [
            {
              type: "checkbox",
              name: "opSystem",
              title: "OS",
              hasOther: true,
              isRequired: true,
              choices: ["Windows", "Linux", "Macintosh OSX"],
            },
          ],
        },
        {
          questions: [
            {
              type: "radiogroup",
              name: "civilwar",
              title: "When was the Civil War?",
              choices: [
                "1750-1800",
                "1800-1850",
                "1850-1900",
                "1900-1950",
                "after 1950",
              ],
              correctAnswer: "1850-1900",
            },
          ],
        },
        {
          questions: [
            {
              type: "radiogroup",
              name: "libertyordeath",
              title: "Who said 'Give me liberty or give me death?'",
              choicesOrder: "random",
              choices: [
                "John Hancock",
                "James Madison",
                "Patrick Henry",
                "Samuel Adams",
              ],
              correctAnswer: "Patrick Henry",
            },
          ],
        },
        {
          maxTimeToFinish: 15,
          questions: [
            {
              type: "radiogroup",
              name: "magnacarta",
              title: "What is the Magna Carta?",
              choicesOrder: "random",
              choices: [
                "The foundation of the British parliamentary system",
                "The Great Seal of the monarchs of England",
                "The French Declaration of the Rights of Man",
                "The charter signed by the Pilgrims on the Mayflower",
              ],
              correctAnswer:
                "The foundation of the British parliamentary system",
            },
          ],
        },
      ],
      //
      /*questions: [
        {
          type: "checkbox",
          name: "car",
          title: "What car are you driving?",
          isRequired: true,
          hasSelectAll: true,
          hasNone: true,
          noneText: "None of the above",
          colCount: 4,
          choicesOrder: "asc",
          choices: [
            "Ford",
            "Tesla",
            "Vauxhall",
            "Volkswagen",
            "Nissan",
            "Audi",
            "Mercedes-Benz",
            "BMW",
            "Peugeot",
            "Toyota",
            "Citroen",
          ],
        },
      ],*/
    };
    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
      />
    ) : null;
    var onCompleteComponent = this.state.isCompleted ? (
      <div>The component after onComplete event</div>
    ) : null;
    return (
      <div>
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}
export default UserSurveyForm;
