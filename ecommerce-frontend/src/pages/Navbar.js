import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/myName.png";

const categoriesData = {
  god: [
    {
      name: "Dresses",
      items: [
        "Laddu Gopal",
        "Radha Krishna",
        "Sai Baba",
        "Durga Ji",
        "Gaur Nitai",
        "Krishna",
        "Laxmi Ganesh",
        "Jagannath Ji",
        "Hanuman Ji",
        "Ram Darbar",
      ],
    },
    {
      name: "Ornaments",
      items: [
        "Garland",
        "Mukut Mala",
        "Pugree/Hats",
        "Necklace/Mala",
        "Flute",
        "Bracelets",
        "Belt",
      ],
    },
  ],
  fragrance: [
    {
      name: "Essential Oils",
      items: ["Lavender", "Rose", "Sandalwood", "Jasmine", "Lemongrass"],
    },
    {
      name: "Incense Sticks",
      items: ["Sandalwood", "Patchouli", "Nag Champa", "Musk"],
    },
  ],
  decor: [
    { name: "Wall Decor", items: ["Paintings", "Wall Hangings", "Mirrors"] },
    { name: "Table Decor", items: ["Vases", "Figurines", "Clocks"] },
  ],
  books: [
    { name: "Spiritual", items: ["Bhagavad Gita", "Ramayana", "Mahabharata"] },
    {
      name: "Philosophy",
      items: ["Meditations", "The Art of Happiness", "The Power of Now"],
    },
  ],
  fabric: [
    { name: "Fabric", items: ["Silk", "Cotton", "Wool", "Linen"] },
    {
      name: "Lace",
      items: ["Floral Lace", "Geometric Lace", "Embroidered Lace"],
    },
  ],
};

function Navbar() {
  const { isAuthenticated, user } = useContext(AuthContext); // Access isAuthenticated and user from AuthContext
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (title) => {
    setActiveDropdown(activeDropdown === title ? null : title);
    setActiveSubcategory(null);
  };

  const toggleSubcategory = (subcategory) => {
    setActiveSubcategory(activeSubcategory === subcategory ? null : subcategory);
  };

  return (
    <nav className="navbar">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
        </NavLink>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center space-x-6">
          <DropdownMenu title="God" categories={categoriesData.god} />
          <DropdownMenu title="Fragrance" categories={categoriesData.fragrance} />
          <DropdownMenu title="Decor" categories={categoriesData.decor} />
          <DropdownMenu title="Books" categories={categoriesData.books} />
          <DropdownMenu title="Fabric & Lace" categories={categoriesData.fabric} />
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center border border-gray-300 rounded-md overflow-hidden w-full sm:w-auto">
          <input type="text" placeholder="Search here..." className="px-4 py-2 text-gray-600 focus:outline-none w-full sm:w-auto" />
          <button className="px-4 text-gray-600"><FaSearch /></button>
        </div>

        {/* Profile, Cart, and Like Icons */}
        <div className="hidden lg:flex items-center space-x-6 relative">
          {isAuthenticated ? (
            <div className="relative group flex flex-col items-center">
              <FaUser className="text-gray-700 text-xl" />
              <span className="text-xs">{user?.username || "Profile"}</span>
            </div>
          ) : (
            <div className="relative group flex flex-col items-center">
              <FaUser className="text-gray-700 text-xl" />
              <span className="text-xs">Profile</span>
              <div className="dropdown-content hidden group-hover:block absolute right-0 mt-10 p-4 space-x-2 bg-white shadow-lg">
                <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                <span className="text-orange-600">or</span>
                <Link to="/register" className="text-gray-700 hover:text-blue-500">Register</Link>
              </div>
            </div>
          )}
          <div className="relative flex flex-col items-center">
            <FaHeart className="text-gray-700 text-xl" />
            <span className="text-xs">Like</span>
          </div>
          <Link to="/cart">
            <div className="relative flex flex-col items-center">
              <FaShoppingCart className="text-gray-700 text-xl" />
              <span className="text-xs">Cart</span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-700">
            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="flex flex-col items-start p-4 space-y-4 mt-6">
          {/* Mobile Dropdowns with Click Effect */}
          {["Login / Registration", "God", "Fragrance", "Decor", "Books", "Fabric & Lace"].map((title) => (
            <div key={title} className="relative">
              <button onClick={() => toggleDropdown(title)} className="flex justify-between items-center w-full text-left p-2 text-gray-700">
                {title}
                <span className="text-gray-500">{activeDropdown === title ? "▲" : "▼"}</span>
              </button>
              {activeDropdown === title && (
                <div className="pl-4 space-y-2 w-full">
                  {categoriesData[title.toLowerCase()]?.map((category, idx) => (
                    <div key={idx}>
                      <button onClick={() => toggleSubcategory(category.name)} className="font-bold w-full text-left text-gray-700 flex justify-between items-center">
                        {category.name}
                        <span className="text-gray-500">{activeSubcategory === category.name ? "▲" : "▼"}</span>
                      </button>
                      {activeSubcategory === category.name && (
                        <ul className="space-y-1 pl-4">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-gray-600 hover:text-orange-500">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
