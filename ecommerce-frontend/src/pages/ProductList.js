import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:8000/api/products/");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:8000/api/cart/", {
        product: productId,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      alert("Please log in to add items to the cart.");
    }
  };

  return (
    <div>
      {/* <h2>Products</h2> */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
