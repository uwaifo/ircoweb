import axios from "axios";
const responseUrl =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user/response";

export async function SendSelectedResponse(respObj) {
  try {
    const updateResponse = await axios.patch(responseUrl, respObj);

    console.log(updateResponse);
  } catch (error) {
    console.log(error);
  }
}
