import React, { useEffect, useState } from 'react'
import useReturnData from '../../hooks/useReturnData'
import axios from 'axios';
import Loader from '../../components/Loader';
import { Navigate, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Categories.css'
import { FreeMode, Pagination } from 'swiper/modules';

export default function Categories() {
    const navigate = useNavigate();
    const { data, errors, isLoading } = useReturnData('/categories/active?limit=9')
    const [categories, setCategories] = useState([]);
    const [returnedErrors, setReturnedErrors] = useState({});
    useEffect(() => {
        setCategories(data.categories);
        setReturnedErrors(errors);
    }, [data, errors])
    const handleClick = (id) => {
        navigate(`/productsCategory/${id}`)
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <div className='categories container'>
                <div className="sectionHeader">
                    <span>Categories</span>
                    <h2>Browse By Category</h2>
                </div>
                <Swiper
                    slidesPerView={4.2}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {
                        (returnedErrors && returnedErrors.message == "Network Error") ? <div className='errorReterned text-danger fs-4 '> server errore pleas try again later </div>
                            : categories?.map(category =>

                                <SwiperSlide key={category._id} className="category" onClick={() => handleClick(category._id)} >
                                    <img src={category.image.secure_url} alt="" />
                                </SwiperSlide>
                            )
                    }
                </Swiper>
            </div>
        </>
    )
}
