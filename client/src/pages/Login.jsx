import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Login = () => {
  const [formdata , setFormData] = useState({});
    const { loading , error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData({
      ...formdata,
      [e.target.id] : e.target.value,
    });
    

  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try {
      // setLoading(true);
      dispatch(signInStart());
    const res = await fetch('/api/auth/signin' , {
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formdata),
    });

    const data = await res.json();
    if(data.success == false){
      dispatch(signInFailure(data.message));
      console.log("error success");
      return; 
    } 
    dispatch(signInSuccess(data));
    navigate('/');
   console.log(data);
    } catch (error) {
        console.log("error in api")
      dispatch(signInFailure(error.message));
    }
    

  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7 '> Sign In </h1>
    <form onSubmit={ handleSubmit } className='flex flex-col gap-4  '>
      <input type= "email" placeholder='email' className=' border p-3 rounded-lg ' id='email' onChange={handleChange}  />
      <input type= "password" placeholder='password' className=' border p-3 rounded-lg ' id='password'  onChange={handleChange} />
      <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...' : 'Sign In'}
        </button>
        < OAuth />
    </form>
   
    {error && <p className='text-red-500 mt-5 '> {error}</p>}
    </div>
  )
}

export default Login