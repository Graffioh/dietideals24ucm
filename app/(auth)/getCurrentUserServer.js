import { cookies } from "next/headers";

export default async function getCurrentUserServer() {
  const nextCookies = cookies();

  const token = nextCookies.has("token")
    ? nextCookies.get("token").value
    : '"no-token"';

  // return token without "
  token.replaceAll('"', "");

  try {
    const subjectFromToken = await fetch(
      "http://localhost:8080/get-subject-from-token",
      {
        method: "POST",
        credentials: "include",
        body: token,
      }
    );

    const userInfo = await subjectFromToken.text();

    if (userInfo.includes("@")) {
      const userResponse = await fetch(
        "http:/localhost:8080/user-from-email?email=" + userInfo
      );

      const user = await userResponse.json();

      return user;
    } else {
      const userResponse = await fetch(
        "http:/localhost:8080/user-from-username?username=" + userInfo
      );

      const user = await userResponse.json();

      return user;
    }
  } catch (e) {
    console.log({ e });
    return undefined;
  }
}
