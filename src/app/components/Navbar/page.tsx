import React from "react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";

const Navbar = () => {
  return (
    <div className="z-50 w-screen">
      <nav className="w-screen px-28 py-6 flex items-center justify-between">
        <div className="flex items-center justify-start gap-10">
          <Image src={logo} priority className="w-52 h-10" alt="Logo" />
          <ul className=" flex flex-row gap-8 text-white">
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <a href="#">About</a>
            </li>
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <a href="#">Suggest a Place</a>
            </li>
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <a href="#">Vote</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button className="font-sans text-white w-[103px] h-[38px] py-1.5 bg-white bg-opacity-25 rounded-[20px] border border-white hover:bg-opacity-50 duration-500 ease-in-out">
            Log In
          </button>
          <button className="font-sans text-white w-[103px] h-[38px] py-1.5 bg-white bg-opacity-25 rounded-[20px] border border-white hover:bg-opacity-50 duration-500 ease-in-out">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
