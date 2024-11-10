import React, { useRef } from "react";

const categories = [
  { id: 1, name: "LADDU GOPAL", image: require("../assets/5551304.jpg") },
  {
    id: 2,
    name: "RADHA KRISHNA",
    image: require("../assets/radha-krishna.jpg"),
  },
  { id: 3, name: "MAATA RANI", image: require("../assets/mata-rani.jpg") },
  { id: 4, name: "MAATA RANI", image: require("../assets/mata-rani.jpg") },
];

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

  return (
    <div className="categories-container">
      <button className="scroll-btn left" onClick={() => handleScroll("left")}>
        &lt;
      </button>

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
