
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constants/index";
import {Mak_AGE } from "@/constants/index";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)
     const value  = token?.value
     const seralized = serialize(COOKIE_NAME, value!, {


         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: -1,
         path: "/",
         });

         return NextResponse.json({message: "Successfully Logout!"}, {
             status: 200,
             headers: { "Set-Cookie": seralized },
         });
}






