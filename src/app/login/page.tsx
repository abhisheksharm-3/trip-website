"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo_dark from "../../../public/images/logo-dark.png";
import loginimage from "../../../public/images/login-image.svg";
import google from "../../../public/images/google.svg";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(true);
  };

  const closeForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the forgot password logic here, e.g., send a reset link to the provided email.
    closeForgotPasswordPopup();
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-1/3 w-screen lg:h-screen lg:w-1/3 bg-violet-300 px-8 lg:px-16 py-8 lg:py-16 flex flex-col items-center lg:items-start gap-10 lg:gap-0">
        <Image src={logo_dark} alt="logo" className="w-[70%]" />
        <p className="hidden lg:block text-black text-opacity-60 text-[26px] font-bold font-sans py-20 leading-9">
          Get reliable and accurate travel information all on one site.
        </p>
        <Image src={loginimage} alt="logo" className="2xl:pt-10" priority />
      </div>
      <div className="h-2/3 w-screen lg:h-screen lg:w-2/3 flex flex-col items-center justify-center py-10 px-11 lg:px-52 gap-6 lg:gap-10">
        <h1 className="text-2xl lg:text-3xl font-extrabold lg:leading-[42px]">
          Sign in to Trip Talkies
        </h1>

        <div className="flex flex-col-reverse gap-6 lg:flex-col items-center justify-center">
          <button className="text-black font-extralight max-w-max max-h-max py-2 border-2 rounded-lg shadow-md lg:w-[75%]">
            <Image
              src={google}
              alt="Google logo"
              className="w-[10%] inline mr-6"
            />
            Sign In with Google
          </button>

          <form onSubmit={handleSubmit} className="mt-4 w-full lg:w-[75%]">
            <div className="mb-4">
              <label htmlFor="username" className="block text-black text-lg">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border-2 rounded-lg w-full py-2 px-4 text-black bg-[#efefef]"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-black text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border-2 rounded-lg w-full py-2 px-4 text-black bg-[#efefef]"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="text-right">
              <p
                className="text-right cursor-pointer text-purple-500 text-sm font-normal hover:text-purple-600 ease-in-out duration-300  hover:font-medium underline"
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forgot Password?
              </p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-violet-400 hover:bg-violet-500 ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg text-lg w-full"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <span className="text-stone-300 text-[13px] font-normal">
            Not a member yet?{" "}
          </span>
          <Link
            href="/"
            className="text-purple-500 text-[13px] font-semibold underline"
          >
            Sign Up
          </Link>
        </div>
      </div>


      {isForgotPasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-lg shadow-md w-[350px] relative flex items-center flex-col justify-center">
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-700 text-3xl focus:outline-none"
              onClick={closeForgotPasswordPopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold pt-8 text-center">Forgot Your Password?</h2>
            <p className="w-72 text-center text-neutral-500 text-sm font-normal pt-4">Don&apos;t worry! Enter the email address you&apos;re using for your account below and we will send you a password reset link.</p>
            <form onSubmit={handleForgotPasswordSubmit} className="mt-4 flex items-center flex-col">
              <div className="mb-4 pt-3">
                <label htmlFor="email" className="block text-black text-lg font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border-2 rounded-lg w-full py-2 px-4 text-black bg-[#efefef]"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-500 ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg text-lg max-w-max"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
