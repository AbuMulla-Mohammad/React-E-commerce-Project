import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useReturnData from '../../hooks/useReturnData';
import Loader from '../../components/Loader';
import axios from 'axios';
import { UserContext } from '../../context/User';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Product.css';
import { CartContext } from '../../context/CartCont';

export default function Product() {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useContext(UserContext);
    const { data, errors, isLoading } = useReturnData(`/products/${id}`);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [returnedErrors, setReturnedErrors] = useState([]);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const { numberOfProducts, setNumberOfProducts } = useContext(CartContext);
    useEffect(() => {
        if (data && data.product) {
            setProduct(data.product);
        }
        if (errors) {
            setReturnedErrors(errors);
        }
    }, [data, errors]);
    const handleClick = async (id) => {
        const token = localStorage.getItem('userToken')
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
                productId: id,
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            setNumberOfProducts(numberOfProducts => numberOfProducts + 1);
            console.log(numberOfProducts);
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
    const handleStarClick = (i) => {
        setRating(i);
    }
    const handleReviewClick = async (productId) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`, {
                "comment": comment,
                "rating": rating
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            alert('your review added Successfully')
            toast.success('your review added Successfully', {
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
            alert(error.response.data.message)
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
        } finally {
            setLoading(false)
        }
    }
    if (isLoading || loading) {
        return <Loader />
    }
    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }
    return (
        <>

            {
                (returnedErrors && returnedErrors.length > 0) ? returnedErrors.map(error =>
                    <div>{error}</div>
                ) : (product) ?
                    <div className="productDetails container">
                        <div className="topSide d-flex flex-xl-row d-flex flex-lg-column flex-md-column flex-sm-column h-100 justify-content-between ">
                            <div className="images start d-flex flex-row-reverse justify-content-evenly flex-wrap p-5 col-xxl-8 col-xl-8 col-lg-12 col-md-12 col-sm-12">
                                <div className="mainImage col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 h-100">
                                    <img src={product.mainImage?.secure_url} className='w-100 h-100 ' alt="" />
                                </div>
                                <div className="subImages col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 d-flex flex-column justify-content-between">
                                    {product.subImages && product.subImages.length > 0 ? product.subImages.map(img =>
                                        <img src={img.secure_url} className='w-100 ' key={img.public_id} alt="" />
                                    ) : ''}
                                </div>
                            </div>
                            <div className="details end p-5 d-flex flex-column col-xxl-4 col-xl-4 col-lg-12 col-md-12 col-sm-12">
                                <h2 className='fs-4 p-2 fw-semibold'>
                                    {product.name}
                                </h2>
                                <div className="p-2 reviews d-flex flex-column gap-3">
                                    <div className="stars d-flex ">
                                        {
                                            Array.from({ length: 5 }, (star, i) => (<span className='starContainer' key={i}>
                                                <svg
                                                    onClick={() => handleStarClick(i + 1)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill={rating > i ? "#fcc419" : "none"}
                                                    viewBox="0 0 24 24"
                                                    stroke="#fcc419"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="{2}"
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                    />
                                                </svg>
                                            </span>)
                                            )
                                        }
                                    </div>
                                    <form onSubmit={() => e.preventDefault()} className='d-flex flex-column gap-3'>
                                        <label htmlFor="Comment" className='fs-5'> Add a Comment</label>
                                        <input type="text" id='Comment' required value={comment} placeholder='Comment ..' onChange={handleCommentChange} />
                                        {
                                            auth ? <button onClick={() => handleReviewClick(product._id)}>add review </button> : <button onClick={() => navigate('/login')}>Log in to review product</button>
                                        }
                                    </form>
                                </div>
                                <span className='price p-2 fs-3 fw-bold border border-top-0 border-start-0 border-end-0 border-bottom-4'>
                                    {product.price} $
                                </span>
                                <p className=" p-2 descrepiton">
                                    {product.description}
                                </p>
                                {auth ?
                                    <button onClick={() => handleClick(product._id)} disabled={product.stock < 1}>Add To Cart</button> : <button onClick={() => navigate('/login')}>Log in to add to cart</button>
                                }
                            </div>
                        </div>
                        <div className="reviewesSection container">
                            <h2>Reviews</h2>
                            <div className='comments  d-flex flex-wrap justify-content-evenly row-gap-4' >

                                {
                                    (product.reviews && product.reviews) ? product.reviews.map(review =>
                                        <div className='review border border-2 p-4 d-flex flex-column gap-2 col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 ' key={review._id}>
                                            <div className='userReviewedDetailes'>
                                                <h5>{review.createdBy.userName}</h5>
                                            </div>

                                            <div className="rating">
                                                <div className="stars d-flex ">
                                                    {
                                                        Array.from({ length: 5 }, (star, i) => (<span className='starContainer' key={i}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill={review.rating > i ? "#fcc419" : "none"}
                                                                viewBox="0 0 24 24"
                                                                stroke="#fcc419"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="{2}"
                                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                                />
                                                            </svg>
                                                        </span>)
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="commentByUser p-3 border border-2 rounded-4">
                                                {
                                                    review.comment
                                                }
                                            </div>
                                        </div>
                                    ) : ""
                                }
                            </div>
                        </div>
                    </div> : <h3>no product aval</h3>
            }
            <ToastContainer />
        </>
    )
}
