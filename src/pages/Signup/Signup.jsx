import axios from 'axios';
import React, { useState } from 'react'
import { object, string} from 'yup';
import PrintErrors from '../../components/PrintErrors';
import { useNavigate } from 'react-router-dom';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Signup() {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  }

  const validateData = async (e) => {
    setValidationErrors({});
    const signUpSchema = object({
      userName: string().min(5, "the user name must have at least 5 letters").max(20, "the user name must be less than 20 letter").required(),
      email: string().email().required(),
      password: string().min(8).required(),
      image: string().required(),
    });
    try {
      await signUpSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      const vErrors = {};
      error.inner.forEach(err => {
        if (e==undefined||e.target.name == err.path) {
          
          if (vErrors[err.path] == undefined) {
            vErrors[err.path] = [err.message];
          }
          else
            vErrors[err.path].push(err.message);
          setValidationErrors(vErrors);
        }
      });

      return false;
    }
  }
  const handleFile = (e) => {
    const { name, files } = e.target;
    console.log(name, files);
    setUser({
      ...user,
      [name]:files[0],
    })
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    const validat = await validateData();
    if (validat) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('userName', user.userName);
        formData.append('email',user.email);
        formData.append('password',user.password);
        formData.append('image',user.image);
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
        console.log("success",data);
        if (data.message == "success") {
          alert("registration success ,We have sent a message to confirm your email. Please confirm it and then log in ");
          navigate('/login');
          
        }
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
      }
      finally {
        setIsLoading(false);
      }
    }
  }
  
  return (
    <>
      <div className='formContainer d-flex justify-content-end align-items-center'>
        <form onSubmit={handleSubmit} className='d-flex col-xl-6 col-lg-6 col-md-12 col-sm-12 '>
          <h2>Create an account</h2>
        <label htmlFor="UserName">User Name</label>
        <input type="text" name="userName" id="UserName" value={user.UserName} onChange={handleChange} onBlur={validateData}/>
        <PrintErrors errors={validationErrors.userName}/>
        <label htmlFor="Email">Email</label>
        <input type="email" name="email" id="Email" value={user.email} onChange={handleChange} onBlur={validateData}/>
        <PrintErrors errors={validationErrors.email}/>
        <label htmlFor="Password">Password</label>
        <input type="password" name="password" id="Password" value={user.password} onChange={handleChange} onBlur={validateData}/>
        <PrintErrors errors={validationErrors.password}/>
        <label htmlFor="Image">Choose an image</label>
        <input type="file" name="image" id="Image" onChange={handleFile} />
        <PrintErrors errors={validationErrors.image}/>
        <input type="submit" value="Sigun up" disabled={isLoading} />
        
      </form>
      </div>
      <ToastContainer/>
    </>
  )
}
