import axios from 'axios';
import React, { useState } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

function LogIn() {

  const [username,setUser] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    
    const res = await axios.get('http://localhost:8000/users', {
      username,
      email,
    });

    for (let user in res.data) {
      //console.log(res.data[user])
      if(res.data[user]["username"]==username && res.data[user]["email"]==email ){
        console.log("Found");
        navigate('/mainPage') ;
      }
    }
    
  }

  return (
    <>
        <form className='p-20 bg-blue-200  rounded-xl block  mt-[10%] mx-[30%]' onSubmit={handleSumbit}>
          <h1 className='font-bold text-4xl pb-3'>LogIn</h1>
          <p>Usuario</p>
          <input 
            type='text'
            onChange={(e)=> setUser(e.target.value)} 
          />
          <p>Correo</p>
          <input 
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