// src/dashboard/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { dashboardAuth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { Avatar } from '@mui/material';

const NavBar = () => {
  const [user] = useAuthState(dashboardAuth);

  const handleSignOut = () => {
    signOut(dashboardAuth);
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-10 w-full shadow-md bg-white'>
      <nav className="p-4 flex justify-between items-center">
        <Link to="/userdashboard" className="font-medium text-2xl">Commentsheild.ai</Link>
        <div>
          {!user ? (
            <>
              <Link to="/signin" className="mr-4 bg-[#6D31ED] rounded-md text-white p-2 w-20 text-sm font-medium">Sign In</Link>
              <Link to="/signup" className="mr-4 bg-[#6D31ED] rounded-md text-white p-2 w-20 text-sm font-medium">Sign Up</Link>
            </>
          ) : (
            <div className='flex items-center'>
              <button className='mr-4 bg-[#6D31ED] rounded-md text-white p-2 w-20 text-sm font-medium'>Pricing</button>
              <button onClick={handleSignOut} className='mr-4 bg-[#6D31ED] rounded-md text-white p-2 w-20 text-sm font-medium'>Sign Out</button>
              <Avatar src='' />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;