import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PublishList({ publish, user_id }) {
  const [usernames, setUsernames] = useState({});
  const [publicationTags, setPublicationTags] = useState({});
  const [publicationCategories, setPublicationCategories] = useState({});
  const navigate = useNavigate()
  /**
   * El componente requiere obtener los datos de cada publicaciones, para lo cual
   * hace consultas a users en la API, también requiere tags y categorias una vez
   * los obtiene almacena mapas para cada uno de estos en caso de que las publicaciones
   * compartan tags. categorias o usuario
   */
  useEffect(() => {
    const fetchUsernamesAndTags = async () => {
      const userIds = publish.map(p => p.user_id).filter(Boolean);
      const publishTags = publish.map(p => p.tags).filter(Boolean);
      const publishCategories = publish.map(p => p.categories).filter(Boolean);
      
      if (userIds.length === 0) {
        return;
      }

      const userRequests = userIds.map(userId =>
        axios.get(`http://localhost:8000/users/${userId}`)
      );

      const tagRequests = publishTags.map(tagList =>
        Promise.all(tagList.map(tag => axios.get(`http://localhost:8000/tags/${tag}`)))
      );

      const categoriesRequests = publishCategories.map(categoriesList =>
        Promise.all(categoriesList.map(categorie => axios.get(`http://localhost:8000/categories/${categorie}`)))
      );

      try {
        const userResponses = await Promise.all(userRequests);
        const tagResponses = await Promise.all(tagRequests);
        const categoriesResponses = await Promise.all(categoriesRequests);

        const newUsernameMap = {};
        userResponses.forEach((response, index) => {
          const { _id, username } = response.data;
          newUsernameMap[userIds[index]] = username;
        });

        const tagsPublishMap = {};
        tagResponses.forEach((response, index) => {
          const tagsForPublish = response.map(tagResponse => tagResponse.data.tag_name);
          tagsPublishMap[publishTags[index]] = tagsForPublish;
        });

        const categoriesPublishMap = {};
        categoriesResponses.forEach((response, index) => {
          const categoriesForPublish = response.map(categoriesResponse => categoriesResponse.data.category_name);
          categoriesPublishMap[publishCategories[index]] = categoriesForPublish;
        });

        setUsernames(newUsernameMap);
        setPublicationTags(tagsPublishMap);
        setPublicationCategories(categoriesPublishMap);

      } catch (error) {
        console.error('Error fetching usernames and tags:', error);
      }
    };

    fetchUsernamesAndTags();
  }, [publish]);
  /**
   * Esta función permite ir a la pagina de publicationPage en la que se
   * muestra mas información de la publicación tales como los comentarios
   */
  const expandPublication = (inter_publish) => {
    navigate("/publicationPage", { replace: true, state: { user_id: user_id, publish: inter_publish } })
  };
  /**
   * Aquí se despliega el html del componente que muestra de manera pequeña
   * los datos de la publicación
   */
  return (
    <>
      {publish.map(publishItem => (
        <div key={publishItem._id} className='p-5'>
          <button onClick={()=>{expandPublication(publishItem)}} className='text-2xl p-2 font-bold'>{publishItem.title}</button>
          <p className='bg-slate-200 p-3 rounded-2xl text-ellipsis overflow-hidden'>{publishItem.content}</p>
          <p>Publicado por: {publishItem.user_id ? usernames[publishItem.user_id] || 'Desconocido' : 'Desconocido'}</p>
          <div className='flex flex-row p-1'>
            <p>Tags: </p>
            {publicationTags[publishItem.tags]?.map((tag, index) => (
              <p key={index} className='p-1 px-2 bg-green-500 rounded-2xl mx-1 text-xs text-justify text-white	'>{tag}</p>
            ))}
          </div>
          <div className='flex flex-row p-1'>
            <p>Categorias: </p>
            {publicationCategories[publishItem.categories]?.map((categories, index) => (
              <p key={index} className='p-1 px-2 bg-green-300 rounded-2xl mx-1 text-xs text-justify text-white	'>{categories}</p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default PublishList;
