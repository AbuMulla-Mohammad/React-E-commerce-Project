import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useReturnData(url) {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (controller) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`https://ecommerce-node4.vercel.app${url}`, {
                signal:controller.signal,
            });
            setData(data);
            setErrors(null);
            
        } catch (error) {
            setErrors(error)
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        const controller = new AbortController();
            getData(controller);
            return () => {
                controller.abort();
            }
        },[url])
    return { data,errors,isLoading };
}
