"use client"

import { SetStateAction, useState } from "react";
import { Login } from "./Login";
import Register from "./Register";
import Reset from "./Reset";

export default function Home() {


  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
    console.log(formName)
  }
  return (
    <>
    
   
    <div className="">
      {
        (currentForm === "login")  ? <Login onFormSwitch={toggleForm} /> :  (currentForm==='register') ? <Register onFormSwitch={toggleForm}/>: <Reset onFormSwitch={toggleForm}/>
        
    
      



       }
     
     

    </div>
    
    </>
  )
}
