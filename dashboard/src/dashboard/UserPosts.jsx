import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { dashboardDb, dashboardAuth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserPosts = () => {
  const [user] = useAuthState(dashboardAuth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const postsQuery = query(collection(dashboardDb, 'posts'), where('createdBy', '==', user.uid));
        const querySnapshot = await getDocs(postsQuery);
        const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(userPosts);
      }
    };
    fetchPosts();
  }, [user]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <img src={post.imageURL} alt="Post" />
          <p>{post.caption}</p>
          <Comments postId={post.id} />
        </div>
      ))}
    </div>
  );
};

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = doc(dashboardDb, 'posts', postId);
      const commentsSnap = await getDoc(commentsRef);
      if (commentsSnap.exists()) {
        setComments(commentsSnap.data().comments || []);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div>
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  );
};

export default UserPosts;