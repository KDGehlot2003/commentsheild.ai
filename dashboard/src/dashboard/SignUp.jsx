// dashboard/SignUp.jsx
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { dashboardAuth } from "./firebaseConfig";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(dashboardAuth, email, password);
      // Optionally, redirect to a different page or show a success message
    } catch (error) {
      setError(error.message);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="bg-[url('image.png')] h-screen bg-cover bg-center bg-fixed bg-opacity-50 pt-20 relative">
      <div className=" absolute top-1/5 left-2/4">
        <div className="border p-5 mt-20 mx-20 h-[529px] w-[482px] rounded-3xl shadow-lg">
          <h3 className="text-center font-semibold text-3xl my-10">
            Welcome  👋🏻
          </h3>
            {error && <Toaster />}
          <form onSubmit={handleSignUp} className=" flex flex-col ml-7">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-lg p-3 mb-5 w-96 bg-[#F3F4F6]"
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded-lg p-3 mb-10 w-96 bg-[#F3F4F6]"
            />
            <button
              type="submit"
              className="border rounded-lg p-3 bg-[#6D31ED] text-white border-gray-500 w-96 font-thin"
            >
              Sign Up
            </button>
            <p className="text-center text-sm mt-3 mr-8">
              Already have an account?{" "}
              <Link to={"/signin"} className=" text-[#6D31ED]">
                Sign in 
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

{
  /* <div className="text-center">
<h2 className="font-bold text-4xl p-4 mt-20">Dashboard Sign Up</h2>
{error && <p>{error}</p>}
<form onSubmit={handleSignUp}>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    className="border rounded-lg p-3 border-black"
  />
  <br />
  <br />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="border rounded-lg p-3 border-black"
  />
  <br />
  <br />
  <button type="submit" className="border rounded-lg p-3 bg-blue-300 border-gray-500">
    Sign Up
  </button>
</form>
</div> */
}
