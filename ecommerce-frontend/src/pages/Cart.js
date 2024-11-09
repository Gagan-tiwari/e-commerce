import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cart/');
                setCartItems(response.data);
            } catch (error) {
                alert('Please log in to view your cart.');
            }
        };
        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Cart</h2>
            <div className="cart-list">
                {cartItems.map(item => (
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
