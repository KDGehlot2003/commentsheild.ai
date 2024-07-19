import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardSignIn from './dashboard/SignIn';
import SignUp from './dashboard/SignUp';
import UserProfile from './dashboard/UserProfile';
import UserPosts from './dashboard/UserPosts';
import NavBar from './dashboard/NavBar';
import Drawer from './components/Drawer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { dashboardAuth } from './dashboard/firebaseConfig';
import InstagramCloneSignIn from './instagramClone/InstagramCloneSignIn';
import Dashboard from './dashboard/Dashboard';
import InstaProfile from './instagramClone/InstaProfile';
import ViewComments from './instagramClone/ViewComments';
import Loading from './components/Loading';
import Analytics from './dashboard/Analytics';

const AppContent = () => {
  const [user, loading] = useAuthState(dashboardAuth);
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setIsAuthPage(location.pathname === '/signin' || location.pathname === '/signup');
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      {!isAuthPage && <Drawer />}
      <Routes>
        <Route path="/signin" element={!user ? <DashboardSignIn /> : <Navigate to="/userdashboard" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/userdashboard" />} />
        <Route path="/userdashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/instagram-clone-signin" element={user ? <InstagramCloneSignIn /> : <Navigate to="/signin" />} />
        <Route path="/instaprofile" element={user ? <InstaProfile /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/signin" />} />
        <Route path="/posts" element={user ? <UserPosts /> : <Navigate to="/signin" />} />
        <Route path="/comments/:postId" element={user ? <ViewComments /> : <Navigate to="/signin" />} />
        <Route path="/analytics/:postId" element={user ? <Analytics /> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to="/signin" />} />
        {/* <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/signin" />} /> */}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;