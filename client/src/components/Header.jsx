import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart , signOutUserSuccess , signOutUserFailure} from '../redux/user/userSlice';

const Header = () => {
  const {currentUser} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleSignOut = async() =>{
    dispatch(signOutUserStart());
    try {
      const res = await fetch('/api/auth/signout');
      const data = res.json();
      if(data.success == false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }
 

  return (
    <header className='bg-slate-200 shadow-md '>
        <div className='flex justify-between items-center max-w-screen-xl mx-auto p-3 '>
            <Link to='/' className='flex flex-1'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>AYs</span>
            <span className='text-slate-700'>Employee</span>
        </h1>
        </Link>

    
        
           
        {currentUser ? (<>
            <ul className='flex flex-1 justify-between items-center gap-4'>
        <Link to='/'>    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li> </Link>
        <Link to='/employee-list'>     <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Employee List</li> </Link>
        <div className='flex items-center gap-2'>
          <img className='rounded-full h-7 w-7 object-cover cursor-pointer' src={currentUser.avatar} alt='profile' />
          <li className=' sm:inline text-slate-700 hover:underline cursor-pointer'>{currentUser.username}</li>
          </div>  <li onClick={handleSignOut} className=' sm:inline text-slate-700 hover:underline cursor-pointer'>Sign out</li> 
          </ul> </>) : (
         <ul> <li className='  text-slate-700 hover:underline cursor-pointer'>Sign in</li> </ul>
        )}
       
       
      
        </div>
    </header>
  )
}

export default Header