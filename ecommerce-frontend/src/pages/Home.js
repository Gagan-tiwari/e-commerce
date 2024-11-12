import React from "react";
import Categories from "./Categories";

function Home() {
  return (
    <div>
      <header
        className="bg-cover bg-center h-64 text-white flex items-center justify-center"
        style={{ backgroundImage: `url(${require("../assets/26539.jpg")})` }}
      >
        <h1 className="text-4xl font-bold text-black text-center">
          Welcome to Gagan Tiwari Decor
        </h1>
      </header>

      <section className="p-8">
        <h2 className="text-2xl font-bold mb-6 relative">
          <span className="relative z-10">God Dresses</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-transparent to-transparent"></span>
        </h2>

        <Categories />
      </section>
    </div>
  );
}

export default Home;
