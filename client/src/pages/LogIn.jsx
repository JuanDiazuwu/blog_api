/* Como se menciono anteriormente se usa react-router-dom para el manejo de
   rutas, la librería de axios permite hacer peticiones de una manera eficiente
*/
import axios from 'axios';
import React, { useState } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

function LogIn() {
  /* Las variables de entrono que se encuentran en el estado del componente
   * se definen aquí principa,ente el user name y el correo.
  */
  const [user_id,setUserId] = useState('');
  const [username,setUser] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  /* Esta función maneja que cada que se suban datos consulta en la base de
     datos los usuarios si encuentra un usuario cuyo email y nombre sean
     iguales a los que se ingresaron navega a la ruta /mainPage llevando se
     los datos del usuario tales como su username, email y user_id
  */
  const handleSumbit = async (e) => {
    e.preventDefault();
    
    try {
        const res = await axios.get("http://localhost:8000/users", {
            params: {
                username,
                email,
            }
        });

        for (let user of res.data) {
            if (user.username === username && user.email === email) {
                //console.log("Found");
                setUserId(user._id);
                navigate('/mainPage', { replace: true, state: { username, email, user_id: user._id } });
                return;
            }
        }
        setErrorMessage("Usuario no encontrado")
        console.log("User not found");
    } catch (e) {
      if (e.response.status === 422) {
        setErrorMessage("Verifique los datos de registro")
      }
    }
}

  /**
   * Aquí se carga el html del componente el cual es un formulario con inputs
   * solicitado tales como el usuario y el correo los cuales hacen una operación
   * set sobre el usuario o el correo para que se guarden en el estado del
   * componente
   */
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
          {errorMessage &&<p className='p-2 text-red-600'>{errorMessage}</p> }
          <div className='block float-right'>
            <button className=' bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl ' >Ingresar</button>
            <a href="/singIn" className='bg-emerald-800 inline-block text-white mt-2 p-1 px-3 rounded-2xl '>Crear Usuario</a>
          </div>
        </form>
    </>
  )
}

export default LogIn