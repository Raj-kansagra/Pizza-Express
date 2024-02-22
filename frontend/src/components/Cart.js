import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Useuser } from "../context/usercontext";
import { Useproduct } from "../context/productcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { alluser, setuser } = Useuser();
  const { allproduct } = Useproduct();
  //const [getid,setid] = useState(101);
  const [render, setrender] = useState(1);
  let count = 0;

  const addtocart = (id) => {
    if (alluser[0]) {
      alluser[0].cart[id]++;
      setrender(render + 1);
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
      toast.success("Cart updated", {
        autoClose: 1000,
      });
    } else {
      //console.log(alluser[0].cart);
      toast.error("Please login", {
        autoClose: 1000,
      });
    }
  };

  const removefromcart = (id) => {
    if (alluser[0]) {
      alluser[0].cart[id]--;
      setrender(render - 1);
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
      toast.success("Cart updated", {
        autoClose: 1000,
      });
    } else {
      //console.log(alluser[0].cart);
      toast.error("Please login", {
        autoClose: 1000,
      });
    }
  };
  if (alluser) {
    alluser[0].cart.map((numberOfItems, j) => {
      if (numberOfItems > 0) {
        for (let i = 0; i < allproduct.length; i++) {
          if (allproduct[i].id == Number(j))
            count += numberOfItems * allproduct[i].price;
        }
      }
    });
  }
  return (
    <div className="main">
      <div className="contain">
        {alluser ? (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Item-id</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price(Rs)</th>
              </tr>
            </thead>
            <tbody>
              {alluser[0].cart.map((numberOfItems, j) => {
                if (numberOfItems > 0) {
                  return (
                    <tr key={j}>
                      {(() => {
                        const items = [];
                        for (let i = 0; i < allproduct.length; i++) {
                          if (allproduct[i].id == Number(j))
                            items.push(
                              <>
                                <td>{j} </td>
                                <td>{allproduct[i].pname}</td>
                                <td>{numberOfItems} </td>
                                <td>
                                  {" "}
                                  <button
                                    className="btn1"
                                    onClick={() =>
                                      addtocart(allproduct[i].id)
                                    }
                                  >+</button>
                                  {allproduct[i].price}
                                  <button
                                    className="btn1"
                                    onClick={() =>
                                      removefromcart(allproduct[i].id)
                                    }
                                  >
                                    -
                                  </button>
                                </td>
                              </>
                            );
                        }
                        return items;
                      })()}
                    </tr>
                  );
                }
              })}
              <tr>
                <td colspan="3">Total</td>
                <td>Rs {count}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>To view the cart, please login or register.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
