import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import './UserInfo.css'
export default function UserInfo() {
  const token = localStorage.getItem('userToken');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: {
            Authorization: `Tariq__${token}`,
        }
      });
      if (data.message == 'success') {
        setUserData(data.user);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getUserData();
  },[])
  if (isLoading) {
    return <Loader/>
  }
  return (
    <>
      <div className='userInfo container' >
        {
          <div className='userData'>
            <div className="userImage ">
            <img src={userData.image?.secure_url} alt="" />
            </div>
            <div className="userDetailes">
              <div className="userName">
                {userData.userName}
              </div>
              <div className="userEmail">
                {userData.email}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
