import React from "react";

const NavBar = () => {
  return (
    <header>
      <nav className="w-full  min-h-7 text-center p-2 text-lg shadow shadow-olive-200 flex flex-row justify-center">

        {/* logo */}
        <span className="flex-1 text-2xl font-semibold text-blue-500">Shortyfy</span>

        {/* button */}
        <div>
            {/* TODO:DARK MODE - LIGHT MODE */}
            dummy
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
