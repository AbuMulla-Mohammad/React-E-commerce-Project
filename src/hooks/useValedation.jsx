import React, { useState } from 'react'

export default function useValedation(schema) {
    const [validationErrors, setValidationErrors] = useState({});
    const validateData = async (schema,data) => {
        
        try {
            await schema.validate(data, { abortEarly: false });
            return {
                isValid: true,
                errors: [],
            };
        } catch (errors) {
            const vErrors = {};
            errors.inner.forEach(err => {
                if (!vErrors[err.path]) {
                    vErrors[err.path] = [];
                }
                else
                    vErrors[err.path].push(err.message);
                console.log("hey val");
                setValidationErrors(vErrors)
            });

            return false;
        }
    }
    const validateField = async (name,value)=>{
      
    }
    const handleBlure = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    }
    return {validationErrors };
}
