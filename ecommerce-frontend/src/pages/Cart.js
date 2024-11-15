import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  // Fetch cart items when user is authenticated
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated) return; // Skip if not authenticated

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8000/api/cart/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send the access token for authorization
          },
        });
        setCartItems(response.data); // Set fetched cart items
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
        } else {
          alert("Error fetching cart items.");
        }
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);

  // If not authenticated, show the login prompt
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
              className="cart-item flex flex-col sm:flex-row justify-between items-center py-4 border-b"
            >
              <div className="flex items-center mb-4 sm:mb-0">
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
              <div className="flex flex-col sm:flex-row items-center">
                <p className="text-sm text-gray-600 mb-2 sm:mb-0">
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
