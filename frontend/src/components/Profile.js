import React from 'react'
import './profile.css'
import { Useuser } from '../context/usercontext'

const Profile = () => {
    const {alluser,setuser} = Useuser();
  return (
    <div className='profile-container'>
      <div className='profile'>
       <span>Name : {alluser ? (alluser[0].name):<div>No data</div>}</span> <br/>
       <span> Email : {alluser ? (alluser[0].email):<div>No data</div>}</span>
      </div>
    </div>
  )
}

export default Profile;
