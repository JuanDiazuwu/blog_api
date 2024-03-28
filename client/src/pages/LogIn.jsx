import React from 'react'

function LogIn() {
  return (
    <>
    
        <form className='p-20 bg-blue-200  rounded-xl block  mt-[10%] mx-[30%]'>
          <h1 className='font-bold text-4xl pb-3'>LogIn</h1>
          <p>Usuario</p>
          <input type='text'></input>
          <p>Correo</p>
          <input type='email'></input>
          <div className='block float-right'>
            <button className=' bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl ' >Ingresar</button>
            <a href="/singIn" className='bg-emerald-800 inline-block text-white mt-2 p-1 px-3 rounded-2xl '>Crear Usuario</a>
          </div>
        </form>
        

    </>
  )
}

export default LogIn