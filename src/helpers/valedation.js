import { useState } from 'react';
import { object, string } from 'yup';

export default async function validateData(e,schema,data){
    const [validationErrors, setValidationErrors] = useState({});
    try {
        await schema.validate(data, { abortEarly: false });
        return { isValid: true, errors: [] };
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