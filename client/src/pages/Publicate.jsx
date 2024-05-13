/**
 * En las librerías usadas en este componente se destacan react-select/animated
 * y react-select las cuales permiten usar un componetne pre-diseñado para
 * hacer la interfaz mas intuitiva
 */
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
    const [deployMessage, setDeployMessage] = useState('');
    // Variables para almacenar los tags y categorias en la BD
    const [tagsList, setTagsList] = useState({});
    const [categoriesList, setCategoriesList] = useState({});
    // Variables para agregar publicaciones
    const [user_id, setUser] = useState("");
    const [content, setContent] = useState ("");
    const [title, setTitle] = useState ("");
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const [newTag, setNewTag] = useState("");
    const [newCategory, setNewCategory] = useState("");
    /**
     * Cada vez que el componente se carga se comprueba si el usuario entro con
     * un usuario, carga los tags y categorias que se encuentran en la base de
     * datos, mediante el método get, estas se almacenan en el estado del
     * componente
     */
    useEffect(() => {
        setUser(location.state.user_id)
        if (!location.state || !location.state.user_id) {
            setErrorMessage("Usuario no encontrado.");
        }
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
    /**
     * Para crear la publicación se manda una petición post a publications
     * se manejan los errores de existir
     */
    const handleSubmit = async (e) => {
        setErrorMessage('');
        e.preventDefault();
        try {
            console.log(user_id)
            const res = await axios.post('http://localhost:8000/publications', {
            user_id,
            title,
            content,
            categories,
            tags
            });
            if (res.status === 200) {
                console.log("Respuesta válida")
                setTitle("");
                setContent("");
                setTags([]);
                setCategories([]);
                setErrorMessage("");
                setDeployMessage("Se agrego la publicación exitosamente")
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
    /**
     * Esta función si se agrega un nuevo tag se llama a un método post
     * a la ruta de tags para subir los tags
     */
    const handleAddTags = async () => {
        setErrorMessage('');
        try {
            const res = await axios.post('http://localhost:8000/tags', {
            "tag_name":newTag
            });
            if (res.status === 200) {
                console.log("Respuesta válida")
                setDeployMessage("Se agrego el tag exitosamente, reinicie la pagina")
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
    };
    /**
     * Esta función similar a la anterior agrega una nueva categoria
     *  se llama a un método posta la ruta de tags para subir categories
     */
    const handleAddCategories = async () => {
        setErrorMessage('');
        try {
            const res = await axios.post('http://localhost:8000/categories', {
            "category_name":newCategory
            });
            if (res.status === 200) {
                console.log("Respuesta válida")
                setDeployMessage("Se agrego la categoria exitosamente, reinicie la pagina")
                // TODO: Mostrar verificación al usuario de que se subio exitosamente
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
    };
    // Ambas funciones ya sea de tags o de categories almacenan los valores seleccionados
    const handleTagChange = (selectedOptions) => {
        setTags(selectedOptions.map((option)=> option.value))
    };
    const handleCategoryChange = (selectedOptions) => {
        setCategories(selectedOptions.map((option)=> option.value))
    };
    /**
     * El html muestra un formulario con inputs para el titulo de la publicación
     * el contenido, un componente Select para seleccionar los tags o categorias
     * deseados, también muestra un botón para subir el formulario, en la parte
     * de abajo se tienen dos campos uno de tags y uno de categories para agregar
     * categorias que no existen.
     */
    return (
        <>
        <div className='p-10 pb-20 bg-teal-700 rounded-xl mx-[10%] text-white font-bold'>
            <form className=' block' onSubmit={handleSubmit}>
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
                {errorMessage && <p className=" text-red-600">{errorMessage}</p>}
                {deployMessage &&<p className='p-2 text-green-200'>{deployMessage}</p> }
                <div className='block float-right'>
                    <button className='bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl mb-10'>Publicar</button>
                </div>
            </form>
            <div className='block pt-5'>
                <input type='text' className='rounded text-black' onChange={(e)=>{setNewTag(e.target.value)}}></input>
                <button className='bg-emerald-800 rounded-2xl ml-5 p-1 px-3'  onClick={handleAddTags}>Agregar tag</button>
            </div>
            <div className='block pt-5'>
                <input type='text' className='rounded text-black' onChange={(e)=>{setNewCategory(e.target.value)}}></input>
                <button className='bg-emerald-800 rounded-2xl ml-5 p-1 px-3' onClick={handleAddCategories}>Agregar categoria</button>
            </div>
        </div>
        </>
    )
}

export default Publicate;
