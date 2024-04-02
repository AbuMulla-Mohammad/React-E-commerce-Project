import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartCont'
import { number, object, string} from 'yup';
import PrintErrors from '../../components/PrintErrors';
import axios from 'axios';
import Loader from '../../components/Loader';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Order() {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    const [ValidationErrors, setValidationErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState({
        cobonName: '',
        address: '',
        phone: null,
        
    });
    const { retCart } = useContext(CartContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
        
    }
    const validateData = async (e) => {
        setValidationErrors({});
        const orderSchema = object({
            address: string().required(),
            phone: number().nullable(false).min(10000000,'number must be at least 8 character').required(),
        });
        try {
            await orderSchema.validate(order, { abortEarly: false });
            return true;
        } catch (errors) {
            const vErrors = {};
            errors.inner.forEach(err => {
                if (e == undefined || e.target.name == err.path)
                {
                    
                    if (vErrors[err.path] == undefined)
                    {
                        console.log(err.message)
                        vErrors[err.path] = [err.message];
                    }
                    else {
                        vErrors[err.path].push(err.message);
                        
                    }
                    setValidationErrors(vErrors);
                }
                console.log(vErrors);
            });

            return false;
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const validat = await validateData();
        if (validat) {
            setIsLoading(true);
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
                    "couponName": order.cobonName,
                    "address": order.address,
                    "phone": order.phone,
                }, {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                });
                console.log(data);
                if (data.message == "success") {
                    alert('your ordere successfully sent , Please check its status in your profile')
                    toast.success('your ordere successfully sent , Please check its status in your profile', {
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
                    navigate('/profile/userOrders');
                }

            } catch (error) {
                
                if (error.response.data.message ) {
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
                }
            } finally {
                setIsLoading(false);
            }
        }
    }
    if (isLoading) {
        return <Loader/>
    }
    console.log(order);
    return (
        <>
            <div className="container mt-5 mb-5">
            {
                (retCart&&retCart.length>0)?retCart.map(product =>
                    <div className="oredrProduct d-flex align-items-center gy-3 justify-content-evenly" key={product._id}>
                        
                            <div className="productShortDetails d-flex align-items-center ">
                            <img width={100} src={product.details.mainImage.secure_url} alt="" />
                                <h5>{product.details.name}</h5>
                                
                            </div>
                        <div className="price">
                        <span>{product.details.price}$</span>
                            </div>
                            <div className="quantity">
                                <span>
                                    quantity: {product.quantity}
                                </span>
                            </div>
                    </div>
                    ) :<h2>cart is empty</h2>
                }
                <div className="formContainer ">
                    <div className="col-xl-5 col-lg-5 col-md-4 col-sm-12 ">
                        <form onSubmit={handleSubmit} >
                            <label htmlFor="Cobon">Cobon</label>
                            <input type="text" name="cobonName" id="Cobon" value={order.cobonName} onChange={handleChange} onBlur={validateData} />
                            <label htmlFor="Address">Address</label>
                            <input type="text" name="address" id="Address" value={order.address} onChange={handleChange} onBlur={validateData}/>
                            <PrintErrors errors={ValidationErrors.address} />
                            <label htmlFor="Phone">Phone number</label>
                            <input type="tel" name="phone" id="Phone" value={order.phone==null?'':order.phone} onChange={handleChange} onBlur={validateData} />
                            <PrintErrors errors={ValidationErrors.phone} />
                            <input type="submit" value="Order" disabled={retCart==undefined} />
                        </form>
                    </div>
                </div>
        </div>
            <ToastContainer/>
    </>
    )
}
