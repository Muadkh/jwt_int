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

 if(password==Pass){

  return NextResponse.json({
message:"Cant Use Previous Password"

  },
  {
    status:401
  }
  )
 }
    
const insert= await db.update(users).set({password:Pass}).where(eq(users.email, Email))


  return NextResponse.json({message: "Password Changed!"}, {
      status: 200,
    
  });



}