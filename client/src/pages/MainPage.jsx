import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PublishList from '../components/PublishList';

function MainPage() {

  const location = useLocation()
  console.log(location)
  const [publish, setPublish]= useState([]);
  useEffect(()=> {
    async function fetchPublish () {
      const res = await axios.get('http://localhost:8000/publications');
      console.log(res);
      setPublish(res.data);
    }
    fetchPublish();
  }, []);


  return (
    <div className='h-fit p-5 bg-blue-200 flex rounded-xl m-10'>
        <div className='p-1 bg-white  rounded-xl w-3/4  ' >
            <PublishList publish={publish}/>
        </div>
        <div className='flex w-1/2'>
            <div className='w-1/2'></div>
            <div className='p-1 rounded-xl w-fit pl-85 pt-10'>
              <h1 className='text-3xl pb-10'>Bienvenido {location.state.username}</h1>
              <button className=' bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl '>Crear publicación</button>
            </div>
            
        </div>
    </div>
  )
}

export default MainPage