"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface UserResponse {
  user: string | null;
  error: string| null;
}
export default function Dashboardlayout( { children,
}: {
  children: React.ReactNode
}) {

  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
       console.log(error)

      if (error) {
        push("/");
        return;
      }

      // if the error did not happen, if everything is alright
      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return <p>Loading...</p>;
  }

const handleclick= async ()=>{
 const res= await fetch('/api/auth/logout')
const {message}= await res.json()
   push('/')

  alert(message)

return 
}

  return (
   <>
   <div className="mt-10 flex justify-center items-center">

   <button onClick={handleclick} >Logout</button>
   </div>
 <div className="flex justift-centre items-center  m-auto rounded ">


   {children}
 </div>
   </>
 

  )
}

async function getUser(): Promise<UserResponse>{
  try {
    const responce  = await fetch("/api/auth/verify");
 const {error,user}= await responce.json()
  if(error==="Unauthorized"){
     return {
      user:null,
      error:error
     }} else {
    return {
      user: user,
      error: null,
    }};
  } catch (err) {
      const eror= err
    return {
      user: null,
      error:"Something Went Wrong"
    };
  }
}