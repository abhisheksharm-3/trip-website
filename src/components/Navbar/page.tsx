"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import Link from "next/link";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <div className="z-50 w-screen">
      <nav className="w-screen px-28 py-6 lg:flex items-center justify-between hidden">
        <div className="flex items-center justify-start gap-10">
          <Image src={logo} priority className="w-52 h-10" alt="Logo" />
          <ul className=" flex flex-row gap-8 text-white">
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <Link href="/suggestion">Suggest a Place</Link>
            </li>
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <Link href="/vote">Vote</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-6">
          <Link
            href="/login"
            className="font-sans text-white w-[103px] h-[38px] py-1.5 bg-white bg-opacity-25 rounded-[20px] border border-white hover:bg-opacity-50 duration-500 ease-in-out grid place-content-center"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="font-sans text-white w-[103px] h-[38px] py-1.5 bg-white bg-opacity-25 rounded-[20px] border border-white hover:bg-opacity-50 duration-500 ease-in-out grid place-content-center"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <nav className="flex lg:hidden items-center py-9 px-8">
        <svg
          onClick={() => setToggleMenu(true)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.8}
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
        <div className="flex w-screen items-center justify-center">
          <Image src={logo} alt="logo" className="w-[200px] cursor-pointer" />
        </div>

        {toggleMenu && (
          <div className="fixed top-0 left-0 w-full h-full bg-[url('/images/homepage-main.jpeg')] bg-cover bg-no-repeat z-50">
            <div className="flex flex-col items-start h-full ease-in duration-500 lg:hidden bg-black bg-opacity-60">
              <div className="py-[14px]">
                <Image src={logo} alt="logo" className="w-52 mx-5 my-5" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer absolute top-5 right-5 hover:text-black ease-in duration-400 text-white my-5"
                  onClick={() => setToggleMenu(false)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <ul className="flex flex-col items-center justify-center w-screen h-screen gap-12 text-white ">
                <li className="hover:text-gray-300 hover:underline duration-500 ease-in-out text-2xl font-bold font-sans">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-gray-300 hover:underline duration-500 ease-in-out text-2xl font-bold font-sans">
                  <Link href="/about">About</Link>
                </li>
                <li className="hover:text-gray-300 hover:underline duration-500 ease-in-out text-2xl font-bold font-sans">
                  <Link href="/suggestion">Suggest a Place</Link>
                </li>
                <li className="hover:text-gray-300 hover:underline duration-500 ease-in-out text-2xl font-bold font-sans">
                  <Link href="/vote">Vote</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
