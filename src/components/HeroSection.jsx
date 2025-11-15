import React from "react";
import tracker from "../images/tracker.jpeg"
import budget from "../images/budget331.png"
import Lottie from "lottie-react";
import finance from "../animation/Data-Dashboard.json"

const Hero = () => {
  return (
    <section className="flex items-center justify-between py-16 px-6 bg-white font-[Poppins]">
      {/* Left side: Text Content */}
      <div className="w-1/2 space-y-6 pl-7">
        <h1 className=" text-3xl font-semibold text-gray-900  ">
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
          <Lottie 
          animationData={finance} 
          loop={true} 
          className="w-full h-auto ml-3"
        />
      </div>
    </section>
  );
};

export default Hero;
