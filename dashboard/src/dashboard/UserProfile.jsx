import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { dashboardDb, dashboardAuth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserProfile = () => {
  const [user] = useAuthState(dashboardAuth);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileDoc = await getDoc(doc(dashboardDb, 'users', user.uid, 'profile'));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        }
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading...</p>;
  

  return (
    <div>
      <img src={profile.profilePicURL} alt={`${profile.username}'s profile`} />
      <h2>{profile.username}</h2>
      {console.log(profile)}
      <p>Followers: {profile.followers.length}</p>
      <p>Following: {profile.following.length}</p>
    </div>
  );
};

export default UserProfile;