import { cookies } from "next/headers";

export default async function getCurrentUserServer() {
  const nextCookies = cookies();

  const tokenFromCookies = nextCookies.has("auth-token")
    ? nextCookies.get("auth-token").value
    : '"no-token"';

  // return token without "
  const authToken = tokenFromCookies.replaceAll('"', "");

  try {
    const subjectFromToken = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/get-subject-from-token",
      {
        method: "POST",
        credentials: "include",
        body: authToken,
      }
    );

    const userInfo = await subjectFromToken.text();

    if (userInfo.includes("@") || userInfo.includes("%40")) {
      try {
        const userResponse = await fetch(
          process.env.NEXT_PUBLIC_BASEURL + "/users/email?email=" + userInfo
        );

        const user = await userResponse.json();

        return user;
      } catch (e) {
        console.error("Error while fetching user from email: " + e);
      }
    } else {
      try {
        const userResponse = await fetch(
          process.env.NEXT_PUBLIC_BASEURL +
            "/users/username?username=" +
            userInfo
        );

        const user = await userResponse.json();

        return user;
      } catch (e) {
        console.error("Error while fetching user from username: " + e);
      }
    }
  } catch (e) {
    console.error("Erorr while fetching from auth token: " + e);
    return undefined;
  }
}
