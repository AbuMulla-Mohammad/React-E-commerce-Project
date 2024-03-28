import React, { useEffect, useState } from 'react'
import useReturnData from '../../hooks/useReturnData'
import axios from 'axios';
import Loader from '../../components/Loader';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Categories() {
    const navigate = useNavigate();
    const { data, errors,isLoading } = useReturnData('/categories/active?limit=9')
    const [categories, setCategories] = useState([]);
    const [returnErrors, setReturnErrors] = useState(errors);
    useEffect(() => {
        setCategories(data.categories);
    }, [data])
    const handleClick = (id) => {
        navigate(`/productsCategory/${id}`)
    }
    if (isLoading) {
            return <Loader/>
    }
    return (
        
    <>
            <div className='categories'>

                {
                    categories?.map(category => 
                        
                        <div key={category._id} className="category" onClick={()=>handleClick(category._id)} >
                            <h2>{category.name}</h2>
                            <img src={category.image.secure_url} alt="" />
                        </div>
                    )
                }
            </div>
    </>
    )
}
