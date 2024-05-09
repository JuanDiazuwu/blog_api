import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PublishList from '../components/PublishList';

function MainPage() {

  const location = useLocation()
  //console.log(location)
  const [publish, setPublish]= useState([]);

  const navigate = useNavigate();

  useEffect(()=> {
    async function fetchPublish () {
      const res = await axios.get('http://localhost:8000/publications');
      //console.log(res);
      setPublish(res.data);
    }
    fetchPublish();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (location.state && location.state.user_id) {
        console.log('The link was clicked.');
        navigate('/publicatePage', { replace: true, state: { user_id: location.state.user_id } });
    } else {
        // Si no hay user_id en el estado de la ubicación, maneja el caso adecuadamente.
        console.error("No se puede encontrar el ID de usuario en la ubicación.");
        navigate('/'); // Redirige a la ruta principal o a donde sea necesario.
    }
}

  const username = location.state && location.state.username != null && location.state.username !== undefined ? location.state.username : null;
  return (
  <>
    <div className='h-fit p-5 bg-blue-200 flex rounded-xl mx-10'>
      <div className='p-1 bg-white  rounded-xl w-3/4  ' >
          <PublishList publish={publish}/>
      </div>
      {username ?(
      <>
        <div className='p-5'>
          <div className='rounded-xl flex flex-col items-center pb-10'>
            <h1 className='text-3xl text-center font-semibold'>Bienvenido {location.state.username}</h1>
          </div>
          <div className='rounded-xl flex flex-col items-center'>
            <button className='bg-emerald-800 text-white rounded-2xl p-3 text-xl ml-10 font-bold' onClick={handleClick}>Crear publicación</button>
          </div>
        </div>
      </>
      )
      :(<></>)
      }
    </div>
  </>
  )
}

export default MainPage