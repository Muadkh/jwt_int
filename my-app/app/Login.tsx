"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export const Login = (props: any) => {
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
const {push}=useRouter()
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try{
      const payload = {
        Email,
        Pass,
      }
      const responce= await fetch("/api/auth/login",{method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
      
    })
   const {message}= await responce.json()

    if(message==='Unauthorized'){

      alert(message)
      return
    } else {
     push("/dashboard")
     alert(message)
    }
  
  }

  catch (err){
    console.log(err)


  }
  }
  return (
    <div>
      <div className=" flex justift-centre items-center flex-col mt-20 border-2 w-1/4 m-auto rounded pb-10 ">
       
        <h2 className="mt-10">Login Here</h2>
        <form
          className=" flex flex-col mt-20 space-y-4 rounded"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">email</label>
          <input
            className="p-3 rounded  text-black  outline-none"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="p-3 rounded text-black  outline-none"
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button className="" type="submit">
            Log In
          </button>
        </form>
        <button className="" onClick={() => props.onFormSwitch("register")}>
          Don't have an account? <span className="hover:underline">Register here.</span>
        </button>
        <div><button className="" type="submit"  onClick={() => props.onFormSwitch("reset")}> Reset Password</button></div>
      </div>
    </div>
  );
};
