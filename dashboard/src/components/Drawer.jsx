import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Drawer = () => {
  return (
    <div>
        <div className='fixed z-5 w-16 top-16 pt-5 h-screen bg-[#6D31ED] shadow-2xl'>
            <div className='flex flex-col justify-center text-white  items-center h-20 text-lg font-medium hover:translate-x-1 hover:duration-300 hover:ease-in-out'>
              <Link to='/userdashboard'>
              <Tooltip title="Home" placement='right'>
              <HomeRoundedIcon />
              </Tooltip>
              </Link>
            </div>
            <div className='flex flex-col justify-center  text-white items-center h-20 text-lg font-medium hover:translate-x-1 hover:duration-300 hover:ease-in-out'>
              <Link to='/analytics'>
            <Tooltip title="Analytics" placement='right'>
              <TrendingUpRoundedIcon />
            </Tooltip>
            </Link>
            </div>
            <div className='flex flex-col justify-center text-white  items-center h-20 text-lg font-medium hover:translate-x-1 hover:duration-300 hover:ease-in-out'>
            <Link to='/about'>
            <Tooltip title="About" placement='right'>
              <InfoOutlinedIcon />
            </Tooltip>
            </Link>

            </div>
        </div>
    </div>
  )
}

export default Drawer