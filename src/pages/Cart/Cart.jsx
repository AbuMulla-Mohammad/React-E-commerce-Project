import React, { useContext, useEffect, useState } from 'react'
import useReturnData from '../../hooks/useReturnData';
import axios from 'axios';
import Loader from '../../components/Loader';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartCont';

export default function Cart() {
    const navigate = useNavigate();
    const {setRetCart} = useContext(CartContext);
    const token = localStorage.getItem('userToken');
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [errors, setErrors] = useState({});
    const [total, setTotal] = useState(0);
    const controller = new AbortController();
    const getCartData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
                headers: {
                    Authorization: `Tariq__${token}`,
                }
            }, {
                signal:controller.signal,
            });
            setCart(data.products);
        } catch (error) {
            console.log(error);
            setErrors({error});
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {

        getCartData();
        return () => {
            controller.abort();
        }
    }, []);
    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            const price = product.details.price;
            const quantity = product.quantity;
            total += price * quantity;
        });
        setTotal(total);
    },[cart])
    if (isLoading) {
        return <Loader/>
    }
    const handleIncraseClick = async(productId) => {
        try {
            
            setIsLoading(true);
            const { data }=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{
                productId,
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            console.log(data);
            
            if (data.message == "success") {
                const updatedCart = cart.map(product => {
                    if (product.productId == productId) {
                        return { ...product, quantity: product.quantity + 1 }
                    }
                    return product;
                });
                setCart(updatedCart);
            }
        } catch (error) {
            
            alert(error);/*_____________________________________________________________________________________________________________________________*/
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
            setIsLoading(false);
            
        }
        
    }
    const handleDecraseClick = async(productId) => {
        try {
            setIsLoading(true);
            const { data }=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{
                productId,
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            if (data.message == "success") {
                const updatedCart = cart.map(product => {
                    if (product.productId == productId) {
                        return { ...product, quantity: product.quantity - 1 }
                    }
                    return product;
                });
                setCart(updatedCart);
            }
        } catch (error) {
            alert(error);/*_____________________________________________________________________________________________________________________________*/
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
        }finally {
            setIsLoading(false);
            
        }
    }
    const handleRemoveProductClick = async(productId) => {
        try {
            setIsLoading(true);
            const { data }=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{
                productId,
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            console.log(data);
            if (data.message == 'success') {
                const updatedCart = cart.filter(product => {
                    return product.productId != productId;
                })
                setCart(updatedCart);
                toast.success('Product Removed Successfully', {
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
        } catch (error) {
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
            setIsLoading(false);
        }
    }
    const handleClearClick = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
                null,
                {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            
            if (data.message == "success") {
                toast.info('Your Cart cleared Successfully', {
                    position: "top-right",
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
            setCart([]);
        } catch (error) {
            console.log(token);
            alert(error.response.data.message);
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
            setIsLoading(false);
        }
    }
    const handleCheckOutClick = () => {
        setRetCart(cart);
        navigate('/order')
    }
    return (
    <>
        <div className="cart container">
                {
                    (cart && cart.length > 0) ?
                        cart.map(product => {
                        const price = product.details.price;
                        const quantity = product.quantity;
                        const subtotal = price * quantity;
                        return <div className="productCart d-flex justify-content-between align-items-center" key={product._id}>
                            <div className="productShortDetails d-flex align-items-center ">
                                <img width={100} src={product.details.mainImage.secure_url} alt="" />
                                <h5>{product.details.name}</h5>
                                <button onClick={()=>handleRemoveProductClick(product.productId)}>
                                    Remove Product
                                </button>
                            </div>
                            <div className="price">
                                <span>
                                    {price} $
                                </span>
                            </div>
                            <div className="quantity">
                                <button className='incraseQuantity' onClick={()=>handleIncraseClick(product.productId)} >+</button>
                                <span>
                                    {quantity}
                                </span>
                                <button className='decraseQuantity' onClick={()=>handleDecraseClick(product.productId)} disabled={quantity==1}>-</button>
                            </div>
                            <div className="Subtotat">
                                <span>
                                    Subtotatl :{subtotal}
                                </span>
                            </div>
                            
                        </div>
                        }): <h2>Cart is empty</h2>
                    
                }
                {
                    (cart && cart.length > 0 )&& <button onClick={handleClearClick}>Clear cart</button>
                }
                {
                    (cart && cart.length > 0 )&& <button onClick={handleCheckOutClick}>check out</button>
                }
                
                <div>total:{total} $</div>
            </div>
            <ToastContainer />
    </>
    ) 
}
