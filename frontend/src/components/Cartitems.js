import React from 'react'
import './Cartitems.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Useuser } from '../context/usercontext';
import { Useproduct } from '../context/productcontext';

const Cartitems = ({image,id,pname,price}) => {
    const {alluser , setuser} = Useuser();

    const addtocart = ()=>{
        if (alluser[0]) {
          alluser[0].cart[id]++;
          setuser(alluser);
          async function updateusercart() {
            try {
              await fetch("http://localhost:5000/updatedata", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(alluser[0]),
              });
            } catch (error) {
              console.log("error in updating user cart");
            }
          }

          updateusercart();
          //console.log(alluser[0].cart);
          toast.success("Added to cart", {
            autoClose: 1000,
          });
        } else {
          //console.log(alluser[0].cart);
          toast.error("Please login", {
            autoClose: 1000,
          });
        }
        
    }
    
  return (
    <div>
      <div className="box">
        <img src={image} alt="this is image" />
        <div className="data">
          <p>
            <b>{pname}</b>
          </p>
          <p className='price'>
            <b> Rs {price}</b>
          </p>
        </div>
        <button className="button-33" onClick={addtocart}>Add to cart</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cartitems;