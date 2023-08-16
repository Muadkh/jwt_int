import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constants/index";
import {Mak_AGE } from "@/constants/index";
import { db } from "@/app/DB";
import { users} from "@/app/DB/schema";
import { eq } from "drizzle-orm";
export async function POST(req:NextRequest,res:NextResponse) {

const {Email,Pass}= await req.json()

console.log(Email)
console.log(Pass)

const result = await db.select().from(users).where(eq(users.email,Email)) 
if(result.length=== 0){
  
  return NextResponse.json({
    message:"Unauthorized"
    
  },
  {
    status:401
  }
  )
}

const {email , password}=result[0]
 console.log(password)
 console.log(Pass)
 if(email!==Email || password!==Pass){

  return NextResponse.json({
message:"Unauthorized"

  },
  {
    status:401
  }
  )
 }
    
const secret= process.env.JWT_SECRET || ''
const token= sign({email},secret,{expiresIn:Mak_AGE})


const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: Mak_AGE,
    path: "/",
  });


  return NextResponse.json({message: "Authenticated!"}, {
      status: 200,
      headers: { "Set-Cookie": seralized },
  });



}