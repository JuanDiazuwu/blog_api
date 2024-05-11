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
    const [publicationComments, setPublicationComments] = useState([]);
    const [commentContent , setCommentContent] = useState("");
    const [oldComments, setOldComments] = useState([]);
    const [updatedComments, setUpdatedComments] = useState([]);
    const [commentsUsernames, setCommentsUsernames] = useState({});

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
            const newCommentId = res.data._id;
            
            if (publish.comments) {
                console.log("1")
                setUpdatedComments([...publish.comments, newCommentId]);
            }else{
                console.log("2")
                setUpdatedComments([...oldComments, newCommentId]);
            }
            setOldComments(updatedComments);
            console.log(updatedComments)
            const resUpdatedPublish = await axios.put(`http://localhost:8000/publications/${publish._id}`,
            {
                "_id": publish._id,
                "title": publish.title,
                "content": publish.content,
                "user_id": publish.user_id,
                "categories": publish.categories,
                "tags": publish.tags,
                "comments": updatedComments,
                "created_at": publish.created_at
            })
            console.log(resUpdatedPublish)
        };
        
        try {
            createComment();
        } catch ( error ) {
            console.log( "Error:", error );
        }
    };

    const fetchUsers = async (e) => {
        const userCommentResponse = await Promise.all(publicationComments.map((response)=>
            axios.get(`http://localhost:8000/users/${response.data.user_id}`)
        ));
        const usernameCommentMap = {};
        userCommentResponse.forEach((response, index) => {
            const { _id, username } = response.data;
            usernameCommentMap[_id]=username;
        })
        setCommentsUsernames(usernameCommentMap)
        console.log("Call")
    };

    useEffect(() => {
        if (location.state && location.state.user_id) {
            setUserLogInController(true)
        } else {
            console.log("Algo salio mal")
        }
        const fetchUsernamesAndTags = async () => {   
            if (publish.user_id != null) {
                const userRequests = await axios.get(`http://localhost:8000/users/${publish.user_id}`);
                try {
                    setPublicationUser(userRequests.data.username)
                } catch (error) {
                    console.error('Error fetching usernames and tags:', error);
                }
            } else {

                setPublicationUser('Desconocido')
            }

      
            if (publish.tags!=null) {
                const tagRequests = await Promise.all(publish.tags.map(tag =>
                    axios.get(`http://localhost:8000/tags/${tag}`))
                    );
                try {
                    setPublicationTags(tagRequests)
                } catch {
                    console.error('Error fetching usernames and tags:', error);
                }
            }
            if (publish.categories!=null) {
                const categoriesRequests = await Promise.all(publish.categories.map(category =>
                    axios.get(`http://localhost:8000/categories/${category}`))
                );
                try {
                    setPublicationCategories(categoriesRequests)                
                } catch {
                    
                    console.error('Error fetching usernames and tags:', error);
                }
            }
            if (publish.comments!=null) {
                const commentsRequests = await Promise.all(publish.comments.map(comment =>
                    axios.get(`http://localhost:8000/comments/${comment}`))
                    );
                    try {
                        setPublicationComments(commentsRequests)
                        
                } catch {
                    console.error('Error fetching usernames and tags:', error);
                }
            }
        };
        fetchUsernamesAndTags();
        fetchUsers();
    }, [publish,publicationComments])
    
   

    const deletePublication = async (e) => {
        e.preventDefault();
        
        const res = await axios.delete(`http://localhost:8000/publications/${publish._id}`)
        console.log(res)
    };


    return (
        <>
            <div className='m-5 p-5 bg-white rounded-2xl'>
                <div className=' flex flex-row justify-between items-center'>
                    <h1 className='text-2xl p-2 font-bold'>{publish.title}</h1>
                    {publish.user_id==location.state.user_id && userLogInController ? (<button onClick={deletePublication} className=' bg-red-600 p-1 px-3 font-semibold rounded-3xl'>X</button>):(<></>)}
                    
                </div>
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
            { userLogInController ? (
                <div>                
                    <div className='m-5 p-5 bg-blue-200 rounded-xl'>
                        <h2 className=' text-xl'>Comentar</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea className='w-full rounded' onChange={(e) => {setCommentContent(e.target.value)}}></textarea>
                            <button className='bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl mb-10'>Comentar</button>
                        </form>
                    </div>
                </div>
            ) : (<></>
            )}
            <div className='bg-white p-5 rounded-2xl m-5'>
                <h2 className='text-xl font-semibold pb-3'>Comentarios</h2>
                {publicationComments!=null ? <div>
                    {publicationComments.map((response, index) => (
                        <div key={index}>
                            <p className='bg-slate-200 p-3 rounded-2xl text-ellipsis overflow-hidden'>{response.data.content}</p>
                            <p>Comentado por :{commentsUsernames[response.data.user_id]}</p>
                        </div>
                    ))}
                </div>:<p>No tiene comentarios</p>}
            </div>
        </>
    )
}

export default Publication