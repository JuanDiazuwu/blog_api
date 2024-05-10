import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function Publication() {
    const [userLogInController, setUserLogInController] = useState(false);
    const location = useLocation();
    const publish = location.state.publish;
    const [publicationUser, setPublicationUser] = useState("");
    const [publicationTags, setPublicationTags] = useState([]);
    const [publicationCategories, setPublicationCategories] = useState([]);   
    const [commentContent , setCommentContent] = useState("");
    const [oldComments, setOldComments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        async function createComment () {
            console.log("Datos de petición")
            console.log(location.state.user_id)
            console.log(commentContent)
            console.log(publish._id)
            const res = await axios.post('http://localhost:8000/comments',
            {
                "user_id" : location.state.user_id,
                "content" : commentContent,
                "publication_id" : publish._id
            })
            console.log("Response:", res)
            console.log(res.data._id)
            
            const resUpdatedPublish = await axios.put(`http://localhost:8000/publications/${publish._id}`,
            {
                "comments" : oldComments
            })
            console.log(resUpdatedPublish)
        }
        try {
            createComment();
        } catch ( error ) {
            console.log( "Error:", error );
        }
    }

    useEffect(() => {
        if (location.state && location.state.user_id) {
            setUserLogInController(true)
        } else {
            console.log("Algo salio mal")
        }
        const fetchUsernamesAndTags = async () => {            
            const userRequests = await axios.get(`http://localhost:8000/users/${publish.user_id}`);
      
            const tagRequests = await Promise.all(publish.tags.map(tag =>
              axios.get(`http://localhost:8000/tags/${tag}`))
            );
      
            const categoriesRequests = await Promise.all(publish.categories.map(categorie =>
                axios.get(`http://localhost:8000/categories/${categorie}`))
            );
      
            try {
                setPublicationUser(userRequests.data.username)
                
                setPublicationTags(tagRequests)
                setPublicationCategories(categoriesRequests)                
      
            } catch (error) {
                console.error('Error fetching usernames and tags:', error);
            }
          };
      
          fetchUsernamesAndTags();
    }, [publish])

    return (
        <>
        { userLogInController ? (
            <div>                
                <div className='m-5 p-5 bg-white rounded-2xl'>
                    <h1 className='text-2xl p-2 font-bold'>{publish.title}</h1>
                    <p className='bg-slate-200 p-3 rounded-2xl text-ellipsis overflow-hidden'>{publish.content}</p>
                    <p>Publicado por: {publicationUser}</p>
                    <div className='flex flex-row p-1'>
                    <p>Tags: </p>
                    {publicationTags.map(( response, index ) => (
                        <p key={index} className='p-1 px-2 bg-green-500 rounded-2xl mx-1 text-xs text-justify text-white	'>{response.data.tag_name}</p>
                    ))}
                    </div>
                    <div className='flex flex-row p-1'>
                    <p>Categorias: </p>
                    {publicationCategories.map(( response, index ) =>(
                        <p key={index} className='p-1 px-2 bg-green-300 rounded-2xl mx-1 text-xs text-justify text-white	'>{response.data.category_name}</p>
                    ))}                
                    </div>
                </div>
                <div className='m-5 p-5 bg-blue-200 rounded-xl'>
                    <h2 className=' text-xl'>Comentar</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea className='w-full rounded' onChange={(e) => {setCommentContent(e.target.value)}}></textarea>
                        <button className='bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl mb-10'>Comentar</button>
                    </form>
                </div>
                {publish.comments!=null ? <p>Tiene comentarios</p>:<p>No tiene comentarios</p>}
            </div>
        ) : (
            <div>                
                <div className='m-5 p-5 bg-white rounded-2xl'>
                    <h1 className='text-2xl p-2 font-bold'>{publish.title}</h1>
                    <p className='bg-slate-200 p-3 rounded-2xl text-ellipsis overflow-hidden'>{publish.content}</p>
                    <p>Publicado por: {publicationUser}</p>
                    <div className='flex flex-row p-1'>
                    <p>Tags: </p>
                    {publicationTags.map(( response, index ) => (
                        <p key={index} className='p-1 px-2 bg-green-500 rounded-2xl mx-1 text-xs text-justify text-white	'>{response.data.tag_name}</p>
                    ))}
                    </div>
                    <div className='flex flex-row p-1'>
                    <p>Categorias: </p>
                    {publicationCategories.map(( response, index ) =>(
                        <p key={index} className='p-1 px-2 bg-green-300 rounded-2xl mx-1 text-xs text-justify text-white	'>{response.data.category_name}</p>
                    ))}                
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default Publication