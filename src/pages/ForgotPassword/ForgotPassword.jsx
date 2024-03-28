import React, { useState } from 'react'
import PrintErrors from '../../components/PrintErrors'
import { object, string} from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [restData, setResetData] = useState({
        email: '',
        password: '',
        code:'',
    })
    const [validationErrors, setValidationErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetData({
            ...restData,
            [name]:value,
        })
    }
    const validateData = async (e) => {
        const restSchema = object({
            email: string().email().required(),
            password: string().min(8).required(),
            code:string().min(4).max(4).required(),
        });
        try {
            await restSchema.validate(restData, { abortEarly: false });
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
        console.log(restData);
        if (validat) {
            try {
                setIsLoading(true);
                await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, restData);
                alert("The password has been reset successfully");
                navigate('/login');
            } catch (error) {
                alert(error);
            }
            finally {
                setIsLoading(false);
            }
        }
    }
    if (isLoading) {
        return<Loader/>
    }
    return (
    <>
        <form onSubmit={handleSubmit} >
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" id="Email" value={restData.email} onChange={handleChange} onBlur={validateData}/>
                <PrintErrors errors={validationErrors.email}/>
                <label htmlFor="NewPassword">New Password</label>
                <input type="password" name="password" id="NewPassword" value={restData.password} onChange={handleChange} onBlur={validateData}/>
                <PrintErrors errors={validationErrors.password} />
                <label htmlFor="Code">Code</label>
                <input type="text" name="code" id="Code" value={restData.code} onChange={handleChange} onBlur={validateData}/>
                <PrintErrors errors={validationErrors.code} />
                <input type="submit" value="Reset" disabled={isLoading} />
        </form>
    </>
    )
}
