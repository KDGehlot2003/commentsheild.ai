import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { dashboardAuth, dashboardDb } from '../dashboard/firebaseConfig';
import { instagramCloneAuth, instagramCloneDb } from '../instagramClone/firebaseConfig';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [user] = useAuthState(dashboardAuth);
  const [instagramAccounts, setInstagramAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstagramAccounts = async () => {
      if (user) {
        const userDoc = await getDoc(doc(dashboardDb, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setInstagramAccounts(userData.instagramAccounts || []);
        }
      }
    };

    fetchInstagramAccounts();
  }, [user]);

  const handleInstagramSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(instagramCloneAuth, email, password);
      const userId = userCredential.user.uid;
      const profileDoc = await getDoc(doc(instagramCloneDb, 'users', userId));
      if (profileDoc.exists()) {
        const userData = profileDoc.data();
        
        if (user) {
          const userDocRef = doc(dashboardDb, 'users', user.uid);
          await updateDoc(userDocRef, {
            instagramAccounts: arrayUnion({ email, password })
          });
        }

        navigate('/userdashboard', { state: { userData } }); // TODO
      } 
    } catch (error) {
        toast.error(`Failed to sign in: ${error.message}`);
      }
  };

  return (
    <div className='mt-20 ml-20 h-full'>
      <Toaster />
      <div className='flex'>
        {instagramAccounts.map((account, index) => (
          <div
            key={index}
            className='border m-8 p-16 text-center rounded-lg shadow-lg cursor-pointer'
            onClick={() => handleInstagramSignIn(account.email, account.password)}
          >
            <img src="instagram.png" alt="instagram" className='w-8 h-8 ml-auto mr-auto m-3' />
            <p>{account.email}</p>
          </div>
        ))}
        <div className='border m-8 p-16 text-center rounded-lg shadow-lg'>
          <img src="instagram.png" alt="instagram" className='w-8 h-8 ml-auto mr-auto m-3' />
          <p>Add an Instagram Account</p>
          <Link to='/instagram-clone-signin'>
            <AddIcon className='border rounded-full border-black m-2 hover:bg-[#6D31ED] hover:invert cursor-pointer' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;