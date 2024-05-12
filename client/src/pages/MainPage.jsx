/* Aquí a diferencia de las anteriores se usa la función useEffect y useLocation
 * ambas funciones son muy utiles una permite ejecutar funciones cada vez
 * que ocurre un cambio en el componente mientras que la otra permite obtener
 * valores heredados de una ruta anterior
*/
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PublishList from '../components/PublishList';

function MainPage() {
  /**
   * Se usa useLocation para obtener atributos heredados de la ruta anterior
   * mientras se definen variables de estado para almacenar las publicaciones
   */
  const location = useLocation()
  const [publish, setPublish]= useState([]);
  const navigate = useNavigate();
  /**
   * Cada vez que se obtiene un cambio en el componente se cargan nuevamente
   * las publicaciones haciendo una petición get a publications la cual responde
   * con las publicaciones que se almacenan en publish
   */
  useEffect(()=> {
    async function fetchPublish () {
      const res = await axios.get('http://localhost:8000/publications');
      setPublish(res.data);
    }
    fetchPublish();
  }, []);
  /**
   * Esta función es especifica para usuarios que hayan ingresado con su cuenta
   * al dar click en el botón de crear publicación se redirige con los datos de
   * usuario a la pagina de publicatePage
   */
  const handleClick = (e) => {
    e.preventDefault();
    if (location.state && location.state.user_id) {
        navigate('/publicatePage', { replace: true, state: { user_id: location.state.user_id }});
    } else {
        console.error("No se puede encontrar el ID de usuario en la ubicación.");
        navigate('/'); // Redirige a la ruta de LogIn
    }
}
  // estas variables permiten que un usuarios entre aun cuando no haya ingresado con un usuario
  const username = location.state && location.state.username != null && location.state.username !== undefined ? location.state.username : null;
  const user_id = location.state && location.state.user_id != null && location.state.user_id !== undefined ? location.state.user_id : null;
  /**
   * El html de esta pagina hace uso de un componente personalizado llamado
   * PublishList el cual se le pasan los parámetros de las publicaciones obtenidas
   * en caso de que se encuentre un usuario se muestra un mensaje de bienvenida
   * y un botón para crear publicaciones
   */
  return (
  <>
    <div className='h-fit p-5 bg-blue-200 flex rounded-xl mx-10'>
      <div className='p-1 bg-white  rounded-xl w-3/4  ' >
          <PublishList publish={publish} user_id={user_id}/>
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