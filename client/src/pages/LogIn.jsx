import axios from 'axios';
import React, { useState } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

function LogIn() {

  const [user_id,setUserId] = useState('');
  const [username,setUser] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    
    try {
        const res = await axios.get('http://localhost:8000/users', {
            params: {
                username,
                email,
            }
        });

        for (let user of res.data) {
            if (user.username === username && user.email === email) {
                console.log("Found");
                setUserId(user._id);
                navigate('/mainPage', { replace: true, state: { username, email, user_id: user._id } });
                return;
            }
        }
        console.log("User not found");
    } catch (error) {
        console.error("Error:", error);
    }
}


  return (
    <>
        <form className='p-20 bg-blue-200  rounded-xl block  mt-[3%] mx-[30%] font-semibold' onSubmit={handleSumbit}>
          <h1 className='font-bold text-4xl pb-3'>LogIn</h1>
          <p>Usuario</p>
          <input 
            className='font-normal'
            type='text'
            onChange={(e)=> setUser(e.target.value)} 
          />
          <p>Correo</p>
          <input 
            className='font-normal'
            type='email'
            onChange={(e)=> setEmail(e.target.value)}
          />
          <div className='block float-right'>
            <button className=' bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl ' >Ingresar</button>
            <a href="/singIn" className='bg-emerald-800 inline-block text-white mt-2 p-1 px-3 rounded-2xl '>Crear Usuario</a>
          </div>
        </form>
    </>
  )
}

export default LogIn