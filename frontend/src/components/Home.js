import React, { useEffect, useState } from 'react'
import Products from './Products'
import './home.css'
import { Useproduct } from '../context/productcontext'
import { Link } from 'react-scroll'
import Service from './Service'



const Home = () => {
  const {allproduct} = Useproduct();
  const [product,setcurproduct] = useState(allproduct);
  
  useEffect(() => {
    setcurproduct(allproduct);
  }, [allproduct]);

  const loadall = ()=>{
    setcurproduct(allproduct);
  }
  const loadpizza = ()=>{
    const items = [];
    for (let i = 0; i < allproduct.length; i++) {
      if(allproduct[i].category==='pizza')
      items.push(allproduct[i]);
    }
    setcurproduct(items);
  }
  const loadburger = ()=>{
    const item = [];
    for (let i = 0; i < allproduct.length; i++) {
      if(allproduct[i].category==='burger')
      item.push(allproduct[i]);
    }
    setcurproduct(item);
  }
  const loadchinese = ()=>{
    const item1 = [];
    for (let i = 0; i < allproduct.length; i++) {
      if(allproduct[i].category==='chinese')
      item1.push(allproduct[i]);
    }
    setcurproduct(item1);
  }
  return (
    <>
      <div>
        <section id="about">
          <div className="about-wrapper container">
            <div className="about-text">
              <h2>Savor the Slice! Irresistible Pizza Deals Await!</h2>
              <Link to="targetSection" smooth><button className="btn btn-danger" >Order now</button></Link>
            </div>
            <div className="about-img"></div>
          </div>
        </section>
        
      </div>
      <div className="main2">
        <div className="pdheader">
          <div className="pdheader-left" id='targetSection'><h1>Our products</h1></div>
          <div className="pdheader-right">
            <div>
              <button className="button-34" onClick={loadall}>All</button>
              <button className="button-34" onClick={loadpizza}>Pizza</button>
              <button className="button-34" onClick={loadburger}>Burger</button>
              <button className="button-34" onClick={loadchinese}>Chinese</button>
            </div>

          </div>
        </div>
        <Products allproduct={product}></Products>
        
      </div>
      <Service></Service>
    </>
  );
}

export default Home;



  
 