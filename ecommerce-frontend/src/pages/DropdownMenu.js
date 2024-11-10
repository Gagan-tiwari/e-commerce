import React, { useState, useEffect } from "react";

const DropdownMenu = ({ title, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 1245);
    };

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button
        className="font-semibold text-lg text-gray-700 hover:text-blue-500"
        onClick={isMobile ? toggleDropdown : undefined}
      >
        {title}
        {!isMobile && (
          <span className="ml-2">
            <i
              className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
            />
          </span>
        )}
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-max p-6 bg-white shadow-lg z-10">
          <div className="flex gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`p-4 flex-1 h-full   ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-300"
                }`}
              >
                <h3 className="font-bold text-orange-500 mb-2">
                  {category.name}{" "}
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </h3>

                <ul className="space-y-1">
                  {category.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-gray-600 hover:bg-orange-500 hover:text-white cursor-pointer p-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
