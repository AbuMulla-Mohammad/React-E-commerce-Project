import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';
import Order from '../Order/Order';
import './Orders.css'
export default function Orders() {
  const token = localStorage.getItem('userToken');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
        headers: {
          Authorization:`Tariq__${token}`,
        }
      }, {
        signal:controller.signal,
    });
      console.log(data.orders);
      setOrders(data.orders);
    } catch (error) {
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
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
            getData();
            return () => {
                controller.abort();
            }
  }, [])
  if (isLoading) {
    return <Loader/>
  }
  return (
    <>
      <div className="container">
      {
        (orders && orders.length > 0) ? <table border={1}><tr>
        <td>order address</td>
        <td>date</td>
        <td>coupon</td>
        <td>final price</td>
        <td>payment type</td>
        <td>status</td>
        </tr>
          {
          
          orders.map(order =>
          <tr key={order._id}>
              <td>{order.address}</td>
              <td>{order.createdAt}</td>
              <td>{order.couponName==''?'no coupon':order.couponName}</td>
              <td>{order.finalPrice}</td>
              <td>{order.paymentType}</td>
              <td>{order.status}</td>
          </tr>
          )
        }</table> : ""
      }
      </div>
      <ToastContainer />
    </>
  )
}