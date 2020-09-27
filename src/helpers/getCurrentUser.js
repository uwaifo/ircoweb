import { Auth } from "aws-amplify";

export async function GetCurrentUser() {
  try {
    const userData = await Auth.currentUserPoolUser();
    return userData;
  } catch (error) {
    console.log("Helper Error: ", error);
  }
}
