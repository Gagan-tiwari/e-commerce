import React from "react";
import logo from "../assets/myName.png";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
        {/* Column 1: Logo, About, Copyright */}
        <div>
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <p className="text-sm mt-2">
            Your destination for unique decor. Transform any space into a haven
            of style and elegance.
          </p>
          <p className="text-m mt-3">
            © 2023 Gagan & Brijesh. All rights reserved.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["About us", "All Categories", "FAQ"].map((link, index) => (
              <li key={index}>
                <a href="#" className="relative group inline-block">
                  {link}
                  <span className="block h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div>
          <h3 className="font-bold mb-4">My Account</h3>
          <ul className="space-y-2">
            {["Login", "Order History", "My Wishlist", "Track Order"].map(
              (link, index) => (
                <li key={index}>
                  <a href="#" className="relative group inline-block">
                    {link}
                    <span className="block h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300"></span>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div>
          <h3 className="font-bold mb-4">Contact Us</h3>
          <p className="text-sm">Email: info@amfez.com</p>
          <p className="text-sm">Phone: +123456789</p>
          <div className="flex justify-center lg:justify-start space-x-4 mt-4">
            <a href="#" className="text-blue-500">
              Facebook
            </a>
            <a href="#" className="text-blue-400">
              Twitter
            </a>
            <a href="#" className="text-pink-600">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
