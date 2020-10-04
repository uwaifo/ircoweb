const questionsUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/questions";

export async function GetAllQuestions() {
  try {
    const allQuestions = await fetch(questionsUrl);
    const questionsjson = allQuestions.json();

    return questionsjson;
  } catch (error) {
    console.log(error);
  }
}

export async function GetQuestion(quid) {}
