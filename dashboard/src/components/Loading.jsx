// Loading.jsx
import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center mt-[30%]'>
        <CircularProgress />
    </div>
  );
};

export default Loading;