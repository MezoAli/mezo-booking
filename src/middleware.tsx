export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/my-bookings",
    "/my-bookings/:path*",
    "/profile",
    "/admin",
    "/admin/:path*",
  ],
};
