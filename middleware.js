import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
// import { NextRequest } from "next/server";

export async function middleware(req) {
  //token will exist if user will login
  if (req.nextUrl.pathname === "/") {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    //ALlow the request if the following is true
    // if the request for next-auth session provider fetching
    //if the token exist

    if (pathname?.includes("/api/auth") || token) {
      return NextResponse.next();
    }

    //Redirect them to the login screen if they dont have token And are requesting  a protected route

    if (!token && pathname !== "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
      // return Response.redirect("/login");
      // console.log(url)
    }
  }
}
