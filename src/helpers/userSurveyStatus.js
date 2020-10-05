import axios from "axios";

const statusUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/surveystatus";

export async function UpdateSurveyStatus(statusObj) {
  try {
    const updateResponse = await axios.patch(statusUrl, statusObj);

    console.log(updateResponse);
  } catch (error) {
    console.log(error);
  }
}
