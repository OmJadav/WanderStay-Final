import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`bg-black h-screen flex-col flex items-center justify-center ${
        loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"
      }`}
    >
      <div>
        <h1 className="text-white text-6xl md:text-8xl font-bold text-center animate__animated animate__fadeIn animate__delay-1s">
          WanderStay
        </h1>
      </div>
      <div>
        <Link to={"/home"}>
          <button className="bg-white text-black font-bold py-2 px-4 rounded m-2">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingScreen;
