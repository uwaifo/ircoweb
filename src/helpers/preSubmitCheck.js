const userApi =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user";

export async function PreSubmitCheck(userId, questionId) {
  let isValid = true;
  try {
    const userProfile = await fetch(`${userApi}/${userId}`);
    const jsonResponse = await userProfile.json();
    const existingResponse = jsonResponse.surveyResponse;

    if (existingResponse.length > 1) {
      existingResponse.forEach((element) => {
        if (element.questionId === questionId) {
          isValid = false;
        }
      });
    }

    return isValid;
  } catch (error) {
    console.log("error: ", error);
  }
}
