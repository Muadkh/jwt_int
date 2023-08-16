"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = (props: any) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const payload = {
        email,
        pass,
        name
      };
      console.log("here");
      const responce = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const { message } = await responce.json();

      if (message === "User Not Exist") {
        alert(message);
        return;
      } else {
        push("/dashboard");
        alert(message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex justift-centre items-center flex-col mt-20 border-2 w-1/4 m-auto rounded pb-10">
        <h2 className="mt-10">Register</h2>
        <form
          className=" flex flex-col mt-20 space-y-4 rounded"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Full name</label>
          <input
            className="p-3 rounded text-black outline-none"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="full Name"
          />
          <label htmlFor="email">email</label>
          <input
            className="p-3 rounded text-black  outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="p-3 rounded text-black  outline-none"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button className="" type="submit">Submit</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account?{" "}
          <span className="hover:underline"> Login here. </span>
        </button>
      </div>
    </div>
  );
};

export default Register;
