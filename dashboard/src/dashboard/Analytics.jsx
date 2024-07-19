import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Breadcrumbs, Typography } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';

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

const Analytics = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [cleanComments, setCleanComments] = useState([]);
  const [abusiveComments, setAbusiveComments] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [diff, setDiff] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const postDoc = await getDoc(doc(instagramCloneDb, 'posts', postId));
        if (postDoc.exists()) {
          const data = postDoc.data();
          setComments(data.comments || []);
          setCleanComments(data.cleanComments || []);
          setAbusiveComments(data.abusiveComments || []);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const categorizeComments = async () => {
      setOpenDialog(true); // Show the dialog before processing
      const postDocRef = doc(instagramCloneDb, 'posts', postId);
      const postDoc = await getDoc(postDocRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        const cleanComments = [];
        const abusiveComments = [];
        setDiff(postData.permnanentComments.length - postData.comments.length)

        for (const comment of postData.permnanentComments) { // Total comments
          const response = await axios.post('http://localhost:8000/predict', { text: comment.comment });
          if (response.data.prediction === 'clean') {
            cleanComments.push(comment);
          } else {
            abusiveComments.push(comment);
          }
        }
        await updateDoc(postDocRef, { cleanComments, abusiveComments });
        setComments(postData.comments);  // Refresh comments to reflect new data
        setCleanComments(cleanComments);
        setAbusiveComments(abusiveComments);
      }
      setOpenDialog(false); // Hide the dialog after processing
    };

    console.log(cleanComments);

    fetchComments();
    categorizeComments(); // Trigger categorization
  }, [postId]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  const data = [
    {name: 'Total Comments', total: cleanComments.length + abusiveComments.length},
    { name: 'Clean Comments', clean: cleanComments.length },
    { name: 'Abusive Comments', abusive: abusiveComments.length },
    {name: 'Total Deleted Comments', diffs: diff}
  ]

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
          Instagram Profile
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <ChatBubbleOutlineRoundedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          View Analytics
        </Typography>
      </Breadcrumbs>
      <h2 className='font-bold text-3xl p-10'>Analytics</h2>

      <div className=' flex justify-center mt-10'>
      <BarChart width={1000} height={350} data={data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
              <Bar dataKey="clean" fill="#82ca9d" />
              <Bar dataKey="abusive" fill="#eb8034" />
              <Bar dataKey="diffs" fill="red" />
            </BarChart>
      </div>
    </div>
  );
};

export default Analytics;