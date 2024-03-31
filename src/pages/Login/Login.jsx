import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/User';
import axios from 'axios';
import Loader from '../../components/Loader';
import { object, string} from 'yup';
import PrintErrors from '../../components/PrintErrors';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const { auth,setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password:'',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]:value,
        })
    }
    const validateData = async (e) => {
        setValidationErrors({});
        const loginSchema = object({
            email: string().email().required(),
            password: string().min(8).required(),
        });
        try {
            await loginSchema.validate(user, { abortEarly: false });
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
        if(validat){
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, user)
            // console.log(data.message)
            if (data.message == 'success') {
                localStorage.setItem('userToken', data.token)
                setUserToken(data.token);
                navigate(-1)
            }
        }
        catch (error) {
            
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

        }
        finally {
            setIsLoading(false);
        }}
    }

    if (isLoading) {
        return <Loader/>
    }
    
    return (
        <>
            <div className="formContainer ">
                <div className="col-xl-5 col-lg-5 col-md-4 col-sm-12 ">
                    
                    <form onSubmit={handleSubmit} className='d-flex col-xl-12 col-lg-12 col-md-12 col-sm-12 '>
                    <h2>Log in to Exclusive</h2>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" id="Email" value={user.email} onChange={handleChange} onBlur={validateData} />
                    <PrintErrors errors={validationErrors.email}/>
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="password" id="Password" value={user.password} onChange={handleChange} onBlur={validateData} />
                    <PrintErrors errors={validationErrors.password}/>
                    <input type="submit" value="login" disabled={isLoading} />
                    <Link to={`/sendcode`}>Forget Password?</Link>
                </form>
                
                </div>
                    
            </div>
            <ToastContainer/>
        </>
    )
}
