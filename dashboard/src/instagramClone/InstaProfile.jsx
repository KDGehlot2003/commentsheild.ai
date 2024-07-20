import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { collection, query, where, getDocs, getFirestore, doc, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import { Avatar, FormControlLabel, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Loading from '../components/Loading';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

const instagramCloneConfig = {
  apiKey: "AIzaSyCmgx8Gp1NHeFx2of6hvpeKM-uXnI-JmuA",
  authDomain: "insta-clone-88bb6.firebaseapp.com",
  projectId: "insta-clone-88bb6",
  storageBucket: "insta-clone-88bb6.appspot.com",
  messagingSenderId: "892918922073",
  appId: "1:892918922073:web:fa1acef39e9c6861326a48",
  measurementId: "G-XQTCRW9SDT"
};

const instagramCloneApp = initializeApp(instagramCloneConfig, "insta-clone");
const instagramCloneDb = getFirestore(instagramCloneApp);

const UserProfile = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCleanToggle, setIsCleanToggle] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userData) {
        setLoading(true);  // Start loading
        const postsQuery = query(collection(instagramCloneDb, 'posts'), where('createdBy', '==', userData.uid));
        const querySnapshot = await getDocs(postsQuery);
        const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(userPosts);
        setLoading(false);  // End loading
      }
    };
    fetchPosts();
  }, [userData]);

  const handleToggleChange = async (event) => {
    setIsCleanToggle(event.target.checked);
    if (event.target.checked) {
      setOpenDialog(true);
    }
  };

  const handleConfirmDelete = async () => {
    setOpenDialog(false);
    const updatedPosts = [];
    for (const post of posts) {
      const postDocRef = doc(instagramCloneDb, 'posts', post.id);
      const cleanComments = [];
      for (const comment of post.comments) {
        const response = await axios.post('http://localhost:8000/predict', { text: comment.comment });
        if (response.data.prediction === 'clean') {
          cleanComments.push(comment);
        }
      }
      await updateDoc(postDocRef, { comments: cleanComments });
      updatedPosts.push({ ...post, comments: cleanComments });
    }
    setPosts(updatedPosts);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsCleanToggle(false);
  };

  if (!userData) {
    return <p>No user data found</p>;
  }

  if (loading) {
    return <Loading />;  // Show loading spinner while fetching data
  }

  return (
    <div className='mt-24 ml-36 h-full mr-10'>
      <div className='flex'>
        <Avatar
          src={userData.profilePicURL}
          alt="Profile"
          sx={{ width: 170, height: 170, mt: 7 }}
        />
        <div className='grid grid-cols-4'>
          <div className='pl-10 relative'>
            <h3 className='py-20 text-3xl font-semibold absolute'>{userData.username}</h3>
            <h3 className='py-20 text-xl absolute mt-12'>{userData.fullName}</h3>
          </div>
          <p className='p-20 text-xl font-semibold'>{posts.length} <span className='font-thin'>Posts</span></p>
          <p className='p-20 text-xl font-semibold'>{userData.followers?.length || 0} <span className='font-thin'>Followers</span> </p>
          <p className='p-20 text-xl font-semibold'>{userData.following?.length || 0} <span className='font-thin'>Following</span> </p>
        </div>
      </div>
      <div className='my-10 flex justify-end'>
        <FormControlLabel
          control={<Switch checked={isCleanToggle} onChange={handleToggleChange} />}
          label="Turn on to delete non-clean comments"
        />
      </div>
      <h2 className='font-bold text-3xl p-4'>Posts</h2>
      <div className='grid grid-cols-3 gap-4 p-5 pl-10'>
        {posts.map(post => (
          <div key={post.id} className='border rounded-lg overflow-hidden'>
            <div className='overflow-hidden h-96 w-96'>
              <img src={post.imageURL} alt="Post" className='object-cover h-96 w-96 rounded-lg' />
            </div>
            <div className='flex justify-between'>
              <p>
                <FavoriteRoundedIcon className='m-2 text-red-500' />
                {post.likes.length}
              </p>
              <p>
                <ChatBubbleOutlineRoundedIcon className='m-2' />
                {post.comments.length}
              </p>
              <p className='m-2'>
                {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='pt-2 pl-2 m-2'>{post.caption}</p>
              <Link to={`/analytics/${post.id}`}>
                <p className='my-2 ml-24 bg-[#6D31ED] text-white px-4 py-2 rounded-xl'>
                  <TrendingUpRoundedIcon />
                </p>
              </Link>
              <Link to={`/comments/${post.id}`}>
                <button className='m-2 bg-[#6D31ED] text-white px-4 py-2 rounded-xl'>View Comments</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Abusive Comments</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete all abusive comments. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;