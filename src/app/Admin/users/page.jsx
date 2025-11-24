"use client";

import Header from '@/Components/Header';
import Video from '@/Components/Video';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [userNumber , setUserNumber] = useState(0);
  const [users , setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const fetchUsers = async ()=>{
      const users = await fetch("https://localhost:7282/api/users/all")
      const json = await users.json()

      setUsers(json)
      setUserNumber(json.length)
      setIsLoading(false)
    }
    fetchUsers()
  } , [])

  if(isLoading){
    return(
      <Video />
    )
  }else{
    
    return (
      <div>
        <Header title="کاربران سایت" />
        <div id='header-of-admin-users'>
          <div id='number-of-users' className='box-admin'></div>
          <div style={{display : "flex" , gap : "10px" , flexDirection:"row-reverse"}}>
            <div className="box-admin" id="add-user-box"></div>
            <div className="box-admin" id="users-block-list"></div>
          </div>
        </div>
      </div>
    )
  }

}

export default page