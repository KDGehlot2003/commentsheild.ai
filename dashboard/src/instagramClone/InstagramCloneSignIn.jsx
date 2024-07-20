import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import bcrypt from 'bcryptjs';  // Import bcryptjs
import { dashboardAuth, dashboardDb } from '../dashboard/firebaseConfig';

const instagramCloneConfig = {
  apiKey: "AIzaSyCmgx8Gp1NHeFx2of6hvpeKM-uXnI-JmuA",
  authDomain: "insta-clone-88bb6.firebaseapp.com",
  projectId: "insta-clone-88bb6",
  storageBucket: "insta-clone-88bb6.appspot.com",
  messagingSenderId: "892918922073",
  appId: "1:892918922073:web:fa1acef39e9c6861326a48",
  measurementId: "G-XQTCRW9SDT"
};

const instagramCloneApp = initializeApp(instagramCloneConfig, "instagram-clone");
const instagramCloneAuth = getAuth(instagramCloneApp);
const instagramCloneDb = getFirestore(instagramCloneApp);

const InstagramCloneSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(dashboardAuth);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(instagramCloneAuth, email, password);
      const userId = userCredential.user.uid;
      const profileDoc = await getDoc(doc(instagramCloneDb, 'users', userId));
      if (profileDoc.exists()) {
        const userData = profileDoc.data();
        
        if (user) {
          const userDocRef = doc(dashboardDb, 'users', user.uid);
          const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password before saving
          await updateDoc(userDocRef, {
            instagramAccounts: arrayUnion({ email, password: hashedPassword })
          });
        }

        navigate('/instaprofile', { state: { userData } });
      } else {
        setError("No profile found");
      }
    } catch (error) {
      setError(error.message);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className='pl-52 pt-10 mt-10 ml-52 h-full'>
      <div className="border p-5 mt-20 mx-20 h-[529px] w-[482px] rounded-3xl shadow-lg">
        <h3 className="text-center font-semibold text-3xl my-10">
          Login with Instagram
        </h3>
        <Toaster />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignIn} className="flex flex-col ml-7">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border rounded-lg p-3 mb-5 w-96 bg-[#F3F4F6]"
          />

          <label htmlFor="password">Password</label>
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstagramCloneSignIn;