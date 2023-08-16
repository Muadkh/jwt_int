import { COOKIE_NAME } from "@/constants";
import { Console } from "console";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);
     console.log(value)
    const response = {
      user: "User Verified",
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}