import React from 'react'
import './service.css'
import fast from '../images/fast.png'
import all from '../images/all.png'
import offer from '../images/offer.png'
const Service = () => {
  return (
    <>
    <h1 className='service'>Why to choose us?</h1>
    <div className='service-main'>
      <div className='service-box'>
            <img src={fast}/>
            <h2>Fast delivery</h2>
      </div>
      <div className='service-box'>
            <img src={all}/>
            <h2>24/7 Support</h2>
      </div>
      <div className='service-box'>
            <img src={offer}/>
            <h2>Offers</h2>
      </div>
    </div>
    </>
  )
}

export default Service
