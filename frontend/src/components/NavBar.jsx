import React from "react";
import { CiSun } from "react-icons/ci";



const NavBar = () => {
  return (
    <header className="flex items-center">
      <nav className="w-full  min-h-7 text-center p-2 text-lg shadow shadow-olive-200 flex flex-row justify-center items-center">

        {/* logo */}
        <span className="flex-1 text-2xl font-semibold text-blue-500">Shortyfy</span>

        {/* button */}
        <div className="flex items-center justify-center">
            {/* TODO:DARK MODE - LIGHT MODE */}
            <CiSun size={30} color="#D14009" />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
