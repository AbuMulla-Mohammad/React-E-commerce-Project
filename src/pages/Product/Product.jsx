import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useReturnData from '../../hooks/useReturnData';
import Loader from '../../components/Loader';
import axios from 'axios';
import { UserContext } from '../../context/User';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth} = useContext(UserContext);
    const { data, errors, isLoading } = useReturnData(`/products/${id}`);
    const [product, setProduct] = useState({});
    const [returnedErrors, setReturnedErrors] = useState([]);
    console.log(useReturnData(`/products/${id}`));
    useEffect(() => {
        if (data && data.product) {
            setProduct(data.product);
        }
        if (errors) {
            setReturnedErrors(errors);
        }
    }, [data,errors]);
    const handleClick = async (id) => {
        const token=localStorage.getItem('userToken')
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
                productId: id,
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            console.log(data)
            toast.success('Product added Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        } catch (error) {
            console.log(error)
            if (error.response.status == 409) {
                toast.error('product already added in the cart', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
            }
            else {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
            }
        }
    }
    if (isLoading) {
        return <Loader/>
    }
    return (
    <>
            
            {
                (returnedErrors && returnedErrors.length > 0) ? returnedErrors.map(error =>
                    <div>{error}</div>
                    ):(product)?
                    <div className="product">
                            <h1>{product.name}</h1>
                            <img src={product.mainImage?.secure_url} alt="" />
                            {auth?
                                <button onClick={() => handleClick(product._id)}>Add To Cart</button>:<button onClick={()=>navigate('/login')}>Log in to add to cart</button>}
                    </div>:<h3>no product aval</h3>
            }
            <ToastContainer />
    </>
    )
}
