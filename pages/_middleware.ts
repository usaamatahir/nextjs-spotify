import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type NextRequestCustom = NextRequest & NextApiRequest;
export async function middleware(req: NextRequestCustom) {
  // Token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET ?? "" });

  const { pathname } = req.nextUrl;
  // Allow the request if the following condition is true

  // 1: If the user is logged in and tries to access the login page, redirect to the home page
  if (token && pathname === "/login") {
    return NextResponse.redirect("/");
  }

  // 2: If the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // 3: Redirect the users to login if they don't have token and requested a protected route

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
