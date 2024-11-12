import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart/");
        setCartItems(response.data);
      } catch (error) {
        alert("Please log in to view your cart.");
      }
    };

    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <p className="text-center text-lg">
        Please{" "}
        <Link to="/login" className="text-blue-600">
          login
        </Link>{" "}
        to view your cart.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item flex justify-between items-center py-4 border-b"
            >
              <div className="flex items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{item.product.price}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
