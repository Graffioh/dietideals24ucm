import { cookies } from "next/headers";

export default async function getCurrentUserServer() {
  const nextCookies = cookies();

  const tokenFromCookies = nextCookies.has("token")
    ? nextCookies.get("token").value
    : '"no-token"';

  // return token without "
  const token = tokenFromCookies.replaceAll('"', "");

  const userInfo = fetch(
    process.env.NEXT_PUBLIC_BASEURL + "/get-subject-from-token",
    {
      method: "POST",
      credentials: "include",
      body: token,
    }
  )
    .then((subject) => {
      return subject.text();
    })
    .catch((e) => {
      console.error("Error while fetching subject from token: " + e);
    });

  if (userInfo.includes("@")) {
    const user = fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/users/email?email=" + userInfo
    )
      .then((userResponse) => {
        return userResponse.json();
      })
      .catch((e) => {
        console.error("Error while fetching user from email: " + e);
        return undefined;
      });

    return user;
  } else {
    const user = fetch(
      process.env.NEXT_PUBLIC_BASEURL + "/users/username?username=" + userInfo
    )
      .then((userResponse) => {
        return userResponse.json();
      })
      .catch((e) => {
        console.error("Error while fetching user from username: " + e);
        return undefined;
      });

    return user;
  }
}
