import React from "react";

const Hero = () => {
  return (
    <div className="p-8 flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">
          URL Shortner, Branded Short Links & Analytics
        </h2>
        <p className="text-xl">
          Welcome to the original link shortner - simplifying the internet
          through the power of the URL.
        </p>
        <p className="text-xl">
          You can track your link Analytics and enjoy other powerful features.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <button className="border border-amber-200 text-xl bg-blue-600 p-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">View Plans</button>
        <button className="text-xl border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-amber-50">Create Free Account</button>
      </div>
    </div>
  );
};

export default Hero;
