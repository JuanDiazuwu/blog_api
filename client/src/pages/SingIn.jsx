import axios from 'axios';
import React, { useState } from 'react';

/* Este componente hace un post a la base de datos en la colección de users
 * para agregar a un usuario a la base de datos con los datos de email y
 * user name
*/
function SingIn() {
  const [username,setUser] = useState('')
  const [email,setEmail] = useState('')

  const handleSumbit = async (e) => {
    e.preventDefault();
    
    const res = await axios.post('http://localhost:8000/users', {
      username,
      email,
    });
    // TODO: Avisar a el usuario que se genero su usuario correctamente
  }
  /**
   * Aquí se despliega un formulario que solicita el nombre de usuario y el email
   * cuenta con un botón de registro al igual que uno para regresar a LogIn
   */
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

