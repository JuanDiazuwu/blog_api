import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PublishList({ publish }) {
  const [usernames, setUsernames] = useState({});
  console.log(publish)
  useEffect(() => {
    const fetchUsernames = async () => {
      const userIds = publish.map(p => p.user_id).filter(Boolean); // Filtra los valores nulos

      if (userIds.length === 0) {
        return; // No hay necesidad de hacer la solicitud si no hay user_ids válidos
      }

      const requests = userIds.map(userId =>
        axios.get(`http://localhost:8000/users/${userId}`)
      );

      try {
        const responses = await Promise.all(requests);
        const newUsernameMap = {};
        responses.forEach((response, index) => {
          const { _id, username } = response.data;
          newUsernameMap[userIds[index]] = username;
        });
        setUsernames(newUsernameMap);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, [publish]);

  return (
    <>
      {publish.map(publishItem => (
        <div key={publishItem._id} className='p-5'>
          <h1 className='text-2xl p-2'>{publishItem.title}</h1>
          <p className='bg-slate-200 p-3 rounded-2xl'>{publishItem.content}</p>
          <p>Author: {publishItem.user_id ? usernames[publishItem.user_id] || 'Unknown' : 'Unknown'}</p>
        </div>
      ))}
    </>
  );
}

export default PublishList;
