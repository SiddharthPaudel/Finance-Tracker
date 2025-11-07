import React from "react";
import tracker from "../images/tracker.jpeg"

const Hero = () => {
  return (
    <section className="flex items-center justify-between py-16 px-6 bg-white font-[Poppins]">
      {/* Left side: Text Content */}
      <div className="w-1/2 space-y-6 pl-7">
        <h1 className=" text-4xl font-extrabold text-gray-900  ">
          Smarter Money, Better Future
        </h1>
        <p className="text-lg text-blue-500 ">
          Track your expenses, manage your savings, and let our AI guide you to spend wisely.
          Your journey toward financial freedom starts here.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-600 transition ">
          Get Started 
        </button>
      </div>

      {/* Right side: Image */}
      <div className="w-1/2">
        <img
          src={tracker}
          alt="Financial Illustration"
          className="w-full h-auto rounded-lg "
        />
      </div>
    </section>
  );
};

export default Hero;
