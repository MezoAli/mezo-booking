import { cookies } from "next/headers";

const getAuthCookieName = () => {
  return process.env.NODE_ENV === "production"
    ? " __Secure-next-auth.session-token"
    : "next-auth.session-token";
};
export function setHeadersToken() {
  const cookie = cookies();
  const cookieName = getAuthCookieName();
  const nextAuthCookies = cookie.get(cookieName);
  return {
    headers: {
      Cookie: `${nextAuthCookies?.name}=${nextAuthCookies?.value}`,
    },
  };
}
