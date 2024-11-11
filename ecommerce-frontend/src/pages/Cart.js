import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cart/');
                setCartItems(response.data);
            } catch (error) {
                alert('Please log in to view your cart.');
            }
        };

        // Only fetch cart items if the user is authenticated
        if (isAuthenticated) {
            fetchCartItems();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <p>Please <Link to="/login">login</Link> to view your cart.</p>;
    }

    return (
        <div>
            <h2>Cart</h2>
            <div className="cart-list">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <p>{item.product.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{item.product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
