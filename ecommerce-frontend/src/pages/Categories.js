import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import axios from 'axios';

// const categories = [
//   { id: 1, name: "LADDU GOPAL", image: require("../assets/5551304.jpg") },
//   {
//     id: 2,
//     name: "RADHA KRISHNA",
//     image: require("../assets/radha-krishna.jpg"),
//   },
//   { id: 3, name: "MAATA RANI", image: require("../assets/mata-rani.jpg") },
//   { id: 4, name: "MAATA RANI", image: require("../assets/mata-rani.jpg") },
// ];

function Categories() {

  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="categories-container">
      <button className="scroll-btn left" onClick={() => handleScroll("left")}>
        &lt;
      </button>
      <Link to="/products" className="category-card-link">
        <div ref={scrollContainerRef} className="categories-wrapper">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>
      </Link>

      <button
        className="scroll-btn right"
        onClick={() => handleScroll("right")}
      >
        &gt;
      </button>
    </div>
  );
}

export default Categories;
