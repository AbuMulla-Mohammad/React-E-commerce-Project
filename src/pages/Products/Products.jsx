import React, { useEffect, useState } from 'react'
import useReturnData from '../../hooks/useReturnData';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function Products() {
    const navigate = useNavigate();
    const { data, errors, isLoading } = useReturnData('/products?page=1&limit=10');
    const [products, setProducts] = useState([])
    const [returnedErrors, setReturnedErrors] = useState([]);
    useEffect(() => {
        setProducts(data.products);
        setReturnedErrors(errors);
    }, [data])
    const handleClick = (id) => {
        navigate(`/product/${id}`);
    }
    console.log(products);
    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            <hr />
            her is the product
            {
                (products && products.length > 0) ? products.map(product =>
                    <div className="product" key={product._id} onClick={()=>handleClick(product._id)}>
                        <h2>{ product.name}</h2>
                        <img src={product.mainImage.secure_url} alt="" />
                    </div>
                    )
                    : <h2>ther is no products</h2>
        }
    </>
    )
}
