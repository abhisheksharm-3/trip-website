"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import woman from "../../../public/images/woman-avatar.svg";
import menu from "../../../public/images/menu-triangle.svg";
import gear from "../../../public/images/gear.svg";
import exit from "../../../public/images/exit.svg";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NavbarLoggedIn = () => {
  const router = useRouter();
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [dropdownMenu, setDropdownMwnu] = React.useState(false);
  const [triangleRotation, setTriangleRotation] = React.useState(0);
  const openDropdown = () => {
    setDropdownMwnu(!dropdownMenu);
    setTriangleRotation(dropdownMenu ? 0 : 180);
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("You're now free as a bird! 🦜🌟");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="z-50 w-screen">
      <nav className="w-screen px-28 py-6 lg:flex items-center justify-between hidden">
        <div className="flex items-center justify-center">
          <Image src={logo} priority className="w-52 h-10" alt="Logo" />
        </div>
        <div className="flex gap-6">
          <ul className=" flex flex-row gap-12 text-white items-center justify-center font-bold">
            <li className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans">
              <Link href="/profile">Home</Link>
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
            <div className=" flex items-end justify-center flex-col">
              <li
                onClick={openDropdown}
                className="hover:text-gray-300 duration-500 ease-in-out text-lg font-sans flex cursor-pointer gap-2"
              >
                <Link href="">
                  <Image src={woman} priority className="" alt="Logo" />
                </Link>
                <Image
                  src={menu}
                  priority
                  className="ease-in-out duration-300"
                  style={{ transform: `rotate(${triangleRotation}deg)` }}
                  alt="menu"
                />
              </li>
              {dropdownMenu && (
                <div className=" absolute bg-white rounded-lg mt-44">
                  <Image
                    src={menu}
                    priority
                    className="ease-in-out duration-300 rotate-180 translate-x-[139px] -translate-y-2"
                    alt="menu"
                  />
                  <ul className="py-3 px-4 flex flex-col items-center justify-center gap-3">
                    <li className="hover:bg-gray-200 cursor-pointer flex gap-16 rounded-lg p-2 text-center text-black">
                      <Image src={gear} priority className="" alt="gear" />
                      <Link href="/settings">Settings</Link>
                    </li>
                    <li className="hover:bg-gray-200 cursor-pointer flex gap-16 rounded-lg p-2 text-center text-black">
                      <Image src={exit} priority className="" alt="exit" />
                      <button onClick={logout}>Log Out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
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
          <div className="fixed top-0 left-0 w-full h-full bg-[url('/images/profilebg-image.jpg')] bg-cover bg-no-repeat z-50">
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

export default NavbarLoggedIn;
