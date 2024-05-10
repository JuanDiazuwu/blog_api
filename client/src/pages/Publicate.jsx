import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

function Publicate() {
    // Variables para control del entrono de publicaciones
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState("");
    // Variables para almacenar los tags y categorias en la BD
    const [tagsList, setTagsList] = useState({});
    const [categoriesList, setCategoriesList] = useState({});
    // Variables 
    const [user, setUser] = useState("");
    const [content, setContent] = useState ("");
    const [title, setTitle] = useState ("");
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!location.state || !location.state.user_id) {
            setErrorMessage("Usuario no encontrado.");
        }
        setUser(location.state.user_id)
        const fetchTagsAndCategories = async (e) => {
            try {
                const resTags = await axios.get('http://localhost:8000/tags');
                const resCategories = await axios.get('http://localhost:8000/categories');
                setTagsList(resTags.data.map(tag => ({ value: tag._id, label: tag.tag_name })));
                setCategoriesList(resCategories.data.map(category => ({ value: category._id, label: category.category_name })));
            } catch (error){
                console.error("Error",error)
            }
        }
        fetchTagsAndCategories();
    }, [location.state, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/publications', {
            user,
            title,
            content,
            categories,
            tags
            });
            if (res.status === 200) {
                console.log("Respuesta válida")
                resetForm()
            } else {
                console.log("Respuesta inválida")
                setErrorMessage("Formulario incompleto.");
            }
        } catch (error) {
            if (error.response) {
                // La solicitud fue realizada, pero el servidor respondió con un código de error
                console.log("Error de respuesta del servidor:", error.response.status);
                setErrorMessage(`Error: ${error.response.status} ${error.response.statusText}`);
            } else if (error.request) {
                // La solicitud se realizó, pero no se recibió respuesta del servidor
                console.log("No se recibió respuesta del servidor:", error.request);
                setErrorMessage("No se recibió respuesta del servidor");
            } else {
                // Ocurrió un error al configurar la solicitud
                console.log("Error al configurar la solicitud:", error.message);
                setErrorMessage(`Error al configurar la solicitud: ${error.message}`);
            }
        }

    }
    const resetForm = () => {
        setTitle('');
        setContent('');
        setCategoriesList([]);
        setTagsList([]);
    };

    const handleTagChange = (selectedOptions) => {
        setTags(selectedOptions.map((option)=> option.value))
    };

    const handleCategoryChange = (selectedOptions) => {
        setCategories(selectedOptions.map((option)=> option.value))
    };

    return (
        <>
            <form className='p-10 pb-20 bg-teal-700 rounded-xl block mx-[10%] text-white font-bold' onSubmit={handleSubmit}>
                <p>Titulo</p>
                <input
                    className='rounded text-black font-normal'
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p>Contenido</p>
                <textarea className='w-full rounded text-black font-normal' onChange={(e) => {setContent(e.target.value)}}></textarea>
                <p>categorias</p>
                <Select
                    className='text-black'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={categoriesList}
                    onChange={handleCategoryChange}
                />
                <p>tags</p>
                <Select
                    className='text-black'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={tagsList}
                    onChange={handleTagChange}
                />
                {errorMessage && <p className=" text-blue-200">{errorMessage}</p>}
                <div className='block float-right'>
                    <button className='bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl mb-10'>Publicar</button>
                </div>
            </form>
        </>
    )
}

export default Publicate;