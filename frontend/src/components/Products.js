import React from 'react'
import Cartitems from './Cartitems'
import './Products.css'
import { Useproduct } from '../context/productcontext'



const Products = ({allproduct}) => {


  return (
    <div className="container1">

      {(() => {
        const items = [];
        for (let i = 0; i < allproduct.length; i++) {
          items.push(
            <Cartitems
              key={allproduct[i].id}
              id={allproduct[i].id}
              pname={allproduct[i].pname}
              price={allproduct[i].price}
              image={allproduct[i].image}
            ></Cartitems>
          );
        }
        return items;
      })()}
    </div>
  );
};

export default Products;