"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Elsie } from "next/font/google";
const Reset = (props: any) => {
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Vpass, setVpass] = useState("");
 const { push } = useRouter();
  const handleSubmit =async (e: { preventDefault: () => void }) => {
    e.preventDefault();
   
if(Pass!==Vpass){

   return alert(`Password fileds didn't Match`)

}
    try{
      const payload = {
        Email,
        Pass,
      }
      const responce= await fetch("/api/auth/reset",{method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
      
    })
   const {message}= await responce.json()

    if(message==='Unauthorized'){

      alert(message)
      return
    } 
    if(message=== 'Cant Use Previous Password'){
     
     alert(message)
     return 
    
    }  else{
      alert(message)

      push("/")

      setEmail('')
      setPass("")
      setVpass('')
    }
  
  }

  catch (err){
    console.log(err)


  }





  };
  return (
    <div>
      <div className="flex justift-centre items-center flex-col mt-20 border-2 w-1/4 m-auto rounded pb-10">
        <h2 className="mt-10">Reset Password</h2>
        <form
          className=" flex flex-col mt-20 space-y-4 rounded"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">email</label>
          <input
            className="p-3 rounded text-black  outline-none"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password"> New password</label>
          <input
            className="p-3 rounded text-black  outline-none"
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />



<label htmlFor="password"> Verify password</label>
          <input
            className="p-3 rounded text-black  outline-none"
            value={Vpass}
            onChange={(e) => setVpass(e.target.value)}
            type="password"
            placeholder="********"
            id="Vpassword"
            name="password"
          />




          <button type="submit">Submit</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? <span className="hover:underline">  Login here. </span>
        </button>
      </div>
    </div>
  );
};

export default Reset;

