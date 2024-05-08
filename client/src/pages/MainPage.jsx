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
    console.log('The link was clicked.');
    navigate('/');
  }
  
  return (
    <div className='h-fit p-5 bg-blue-200 flex rounded-xl m-10'>
        <div className='p-1 bg-white  rounded-xl w-3/4  ' >
            <PublishList publish={publish}/>
        </div>
        <div className='flex w-1/2'>
            <div className='w-1/2'></div>
            <div className='p-1 rounded-xl w-fit pl-85 pt-10'>
              <h1 className='text-3xl pb-10 text-center'>Bienvenido {location.state.username}</h1>
              <button className=' bg-emerald-800 block text-white mt-2 p-1 px-10 rounded-2xl ' onClick={handleClick}>Crear publicación</button>
            </div>
            
        </div>
    </div>
  )
}

export default MainPage