import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import axios from 'axios';
import { FormControlLabel, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Breadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';


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

const ViewComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isCleanToggle, setIsCleanToggle] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const postDoc = await getDoc(doc(instagramCloneDb, 'posts', postId));
        if (postDoc.exists()) {
          setComments(postDoc.data().comments || []);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleDeleteComment = async (commentIndex) => {
    try {
      const postDocRef = doc(instagramCloneDb, 'posts', postId);
      const postDoc = await getDoc(postDocRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        const updatedComments = postData.comments.filter((_, index) => index !== commentIndex);
        await updateDoc(postDocRef, { comments: updatedComments });
        setComments(updatedComments);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleChange = async (event) => {
    setIsCleanToggle(event.target.checked);
    if (event.target.checked) {
      setOpenDialog(true);
    }
  };

  const handleConfirmDelete = async () => {
    setOpenDialog(false);
    // Call the API for each comment
    const postDocRef = doc(instagramCloneDb, 'posts', postId);
    const postDoc = await getDoc(postDocRef);
    if (postDoc.exists()) {
      const postData = postDoc.data();
      const cleanComments = [];
      for (const comment of postData.comments) {
        const response = await axios.post('http://localhost:8000/predict', { text: comment.comment });
        if (response.data.prediction === 'clean') {
          cleanComments.push(comment);
        }
      }
      await updateDoc(postDocRef, { comments: cleanComments });
      setComments(cleanComments);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsCleanToggle(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='mt-24 ml-24 mr-10'>
      <Breadcrumbs aria-label="breadcrumb">
      <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/instaprofile"
          onClick={() => navigate(-1)}
        >
          {/* <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
          Instagram
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
        <ChatBubbleOutlineRoundedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          View Comments
        </Typography>
      </Breadcrumbs>
      <h2 className='font-bold text-3xl p-4'>Comments</h2>
      <div className=' text-right'>
        <FormControlLabel
          control={<Switch checked={isCleanToggle} onChange={handleToggleChange} />}
          label="Turn on to delete non-clean comments"
        />
      </div>
      <div className='mt-4'>
        {comments.map((comment, index) => (
          <div key={index} className='border p-4 mb-2 flex justify-between'>
            <p>{comment.comment}</p>
            <button 
              onClick={() => handleDeleteComment(index)} 
              className='border rounded-lg p-2 bg-red-500 text-white'>
              Delete
            </button>
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

export default ViewComments;