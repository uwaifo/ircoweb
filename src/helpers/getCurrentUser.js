import { Auth } from "aws-amplify";
//const userApi = process.env.GETUSERURL;
const userApi =
  "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user";
export async function GetCurrentUser() {
  try {
    const userData = await Auth.currentUserPoolUser();
    return userData;
  } catch (error) {
    console.log("Helper Error: ", error);
  }
}

export async function GetCurrentUserprofile(userData) {
  //const userData = await GetCurrentUser();

  try {
    const userProfile = await fetch(`${userApi}/${userData.username}`);
    const jsonResponse = await userProfile.json();
    return jsonResponse;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function LogoutUser() {
  Auth.signOut();
}

export async function GetProgressPosition() {}
