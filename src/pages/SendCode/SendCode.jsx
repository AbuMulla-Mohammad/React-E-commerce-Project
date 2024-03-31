import React, { useState } from 'react'
import useValedation from '../../hooks/useValedation';
import { object, string} from 'yup';
import PrintErrors from '../../components/PrintErrors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function SendCode() {
    // const emailSchema = object({
    //     email: string().email().required(),
    // });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [email, setEmail] = useState({
        email:'',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail({
            [name]:value,
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const validat = await validateData();
        if (validat) {
            try {
                setIsLoading(true);
                await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, email);
                
                alert("We send a code to reset your password, check your email");
                navigate('/forgotPassword');
                
            } catch (error) {
                if(error.message=="Network Error") {
                    alert("server error , Please try again later");
                    toast.error("server error , Please try again later", {
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
                }else if (error.response.data.message!=undefined) {
                    alert(error.response.data.message);
                    toast.error(error.response.data.message, {
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
            } finally {
                setIsLoading(false);
            }
        }
    }
    const validateData = async (e) => {
        const emailSchema = object({
            email: string().email().required(),
        });
        try {
            await emailSchema.validate(email, { abortEarly: false });
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
    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            <div className="formContainer container">
                
                <form action="" onSubmit={handleSubmit} className=' col-xl-6 col-lg-6 col-md-12 col-sm-12 '>
                        <h2>Type your email below </h2>
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" id="Email" placeholder='Email' value={email.email} onChange={handleChange} onBlur={validateData}/>
                        <PrintErrors errors={validationErrors.email}/>
                        <input type="submit" value="Send code" disabled={isLoading}/>
                </form>
            </div>
            <ToastContainer/>
    </>
    )
}
