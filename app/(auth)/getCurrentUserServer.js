import { cookies } from "next/headers";

export default async function getCurrentUserServer() {
  const nextCookies = cookies();

  const tokenFromCookies = nextCookies.has("token")
    ? nextCookies.get("token").value
    : '"no-token"';

  // return token without "
  const token = tokenFromCookies.replaceAll('"', "");

  try {
    const subjectFromToken = await fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/get-subject-from-token",
      {
        method: "POST",
        credentials: "include",
        body: token,
      }
    );

    const userInfo = await subjectFromToken.text();

    if (userInfo.includes("@")) {
      const userResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/users/email?email=" + userInfo
      );

      const user = await userResponse.json();

      return user;
    } else {
      const userResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/users/username?username=" + userInfo
      );

      const user = await userResponse.json();

      return user;
    }
  } catch (e) {
    console.log({ e });
    return undefined;
  }
}
