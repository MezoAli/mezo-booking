import { cookies } from "next/headers";
let cookeiName: string;
if (process.env.NODE_ENV === "development") {
  cookeiName = "next-auth.session-token";
} else {
  cookeiName = " __Secure-next-auth.session-token";
}
export function setHeadersToken() {
  const cookie = cookies();
  const nextAuthCookies = cookie.get(cookeiName);
  return {
    headers: {
      Cookie: `${cookeiName}=${nextAuthCookies?.value}`,
    },
  };
}
