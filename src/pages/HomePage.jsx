import React from "react";
import farmImage from '../assets/hand-drawn-flat-design-farmers-illustration.png';
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  return (
    <div>
      
      <header className="relative bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: `url(${farmImage})` }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-50 z-10"></div>
        <div className="flex flex-col justify-center items-center text-center h-full relative z-20 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 max-w-4xl mx-auto">
            Farm Fresh Goodness, Just One Click Away
          </h1>
          <button className="mt-8 bg-green-700 text-white px-12 py-4 text-xl md:text-2xl rounded-full hover:bg-green-800 transition duration-300">
            <Link to="/" className="text-white no-underline">Shop Now</Link>
          </button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
