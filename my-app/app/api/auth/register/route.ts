import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constants/index";
import {Mak_AGE } from "@/constants/index";
import { db } from "@/app/DB";
import { users} from "@/app/DB/schema";
import { eq } from "drizzle-orm";
export async function POST(req:NextRequest,res:NextResponse) {

  const {email,pass,name}= await req.json()
console.log(email)
console.log(pass)
console.log(name)
 const result = await db.select().from(users).where(eq(users.email,email)) ;

 console.log(result[0])
 if(result.length!== 0){
   
   return NextResponse.json({
     message:"User Already Exist"
     
    },
    {
      status:401
    }
    )
  }
const insert= await db.insert(users).values({name:name,email:email,password:pass})
    
const secret= process.env.JWT_SECRET || ''
const token= sign({email},secret,{expiresIn:Mak_AGE})


const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: Mak_AGE,
    path: "/",
  });


  return NextResponse.json({message: "New User Registered!"}, {
      status: 200,
      headers: { "Set-Cookie": seralized },
  });



}