import React from "react";
import "./Orders.css";
import { deleteOrder } from "../../apiCalls";

const Orders = (props) => {

  const orderComplete = (e) => {
    deleteOrder(e.target.id).then(
      console.log('success')
    ).catch(err => console.log(err))
  }

  const orderEls = props.orders.map((order, index) => {
    return (
      <div className="order" key={index}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
        <button id={order.id} className="delete-btn" onClick={(e) => orderComplete(e)}>X</button>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
