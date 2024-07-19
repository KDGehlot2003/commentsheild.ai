import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { dashboardAuth, dashboardDb } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ClassNames } from "@emotion/react";
import { Alert } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import toast, { Toaster } from 'react-hot-toast';

const DashboardSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        dashboardAuth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(dashboardDb, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          instagramAccounts: { email: "", password: "" }
        });
      }
      navigate("/userdashboard");
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
            Welcome back 👋🏻
          </h3>
            <Toaster />
          <form onSubmit={handleSignIn} className=" flex flex-col ml-7 mt-4">
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
              Sign In
            </button>
            <p className="text-center text-sm mt-3 mr-8">Not a member yet? <Link to={'/signup'} className=" text-[#6D31ED]">Register now</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardSignIn;
