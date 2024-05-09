import axios from 'axios';
import React, { useState } from 'react';

function SingIn() {
  const [username,setUser] = useState('')
  const [email,setEmail] = useState('')

  const handleSumbit = async (e) => {
    e.preventDefault();
    
    const res = await axios.post('http://localhost:8000/users', {
      username,
      email,
    });

    //console.log(res);
    
  }

  return (
    <>
        <form className='p-20 bg-blue-200  rounded-xl block  mt-[10%] mx-[30%] font-semibold' onSubmit={handleSumbit}>
          <h1 className='font-bold text-4xl pb-3'>SingIn</h1>
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
            <button className=' bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl ' >Registrarse</button>
            <a href="/" className='bg-emerald-800 inline-block text-white mt-2 p-1 px-3 rounded-2xl '>LogIn</a>
          </div>
        </form>
    </>
  )

}

export default SingIn

