import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useReturnData(url) {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}${url}`);
            setData(data);
            setErrors(null);
            
        } catch (error) {
            setErrors(error)
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        // const controller = new AbortController();
            getData();
            // return () => {
            //     controller.abort();
            // }
        },[url])
    return { data,errors,isLoading };
}
