import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

function Publicate() {
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [tagsList, setTagsList] = useState({})
    const [categoriesList, setCategoriesList] = useState({})
    
    useEffect(() => {
        if (!location.state || !location.state.user_id) {
            setErrorMessage("Usuario no encontrado.");
        }
        const fetchTagsAndCategories = async (e) => {
            try {
                const resTags = await axios.get('http://localhost:8000/tags');
                const resCategories = await axios.get('http://localhost:8000/categories');
                console.log(resTags.data)
                console.log(resCategories.data)
                setTagsList(resTags.data.map(tag => ({ value: tag._id, label: tag.tag_name })));
                setCategoriesList(resCategories.data.map(category => ({ value: category._id, label: category.category_name })));
            } catch (error){
                console.error("Error",error)
            }
        }
        fetchTagsAndCategories();
    }, [location.state, navigate]);

    const handleSumbit = async (e) => {
        e.preventDefault();


        setErrorMessage("Formulario incompleto.");
    }

    return (
        <>
            <form className='p-10 pb-20 bg-teal-700 rounded-xl block mx-[10%] text-white font-bold' onSubmit={handleSumbit}>
                <p>Titulo</p>
                <input
                    className='rounded text-black font-normal'
                    type='text'
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <p>Contenido</p>
                <textarea className='w-full rounded text-black font-normal' onChange={() => { }}></textarea>
                <p>categorias</p>
                <Select
                    className='text-black'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={categoriesList}
                />
                <p>tags</p>
                <Select
                    className='text-black'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={tagsList}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className='block float-right'>
                    <button className='bg-emerald-800 block text-white mt-2 p-1 px-3 rounded-2xl mb-10'>Publicar</button>
                </div>
            </form>
        </>
    )
}

export default Publicate;
