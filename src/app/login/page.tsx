"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo_dark from "../../../public/images/logo-dark.png";
import loginimage from "../../../public/images/login-image.svg";
import google from "../../../public/images/google.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  const onLogin = React.useCallback(async () => {
    try {
      setLoading(true);
      const userToLogin = {
        email: email,
        password: password,
      };
      console.log(userToLogin)
      const response = await axios.post("/api/users/login", userToLogin);
      toast.success("Login successful! You're in! 🚀");
      router.push("/profile");
    } catch (error: any) {
      toast.error(`Oops! Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  React.useEffect(() => {
    if (email.length > 6 && password.length > 8) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const openForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(true);
  };

  const closeForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(false);
    setResetPasswordSuccess(false); // Reset the success state
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleForgotPasswordSubmit = (e: any) => {
    e.preventDefault();

    // Simulate sending a reset email (replace with your actual email logic)
    // For now, we'll just set a timeout to simulate the email sending process.
    setTimeout(() => {
      setResetPasswordSuccess(true);
      toast.success("Password reset email sent! Check your inbox. 📬");
    }, 2000); // Adjust the time as needed

    // if(resetPasswordSuccess === false){
    //   toast.error("Oops! Something went wrong while sending the reset email. Please try again later.");
    // }

    // You should also handle errors if the email sending fails.
  };

  return (
    <div className="flex flex-col lg:flex-row dark:bg-gray-800">
      <div className="h-1/3 w-screen lg:h-screen lg:w-1/3 bg-violet-300 dark:bg-violet-900 px-8 lg:px-16 py-8 lg:py-16 flex flex-col items-center lg:items-start gap-10 lg:gap-0">
        <Image src={logo_dark} alt="logo" className="w-[70%]" />
        <p className="hidden lg:block text-black dark:text-white text-opacity-60 text-[26px] font-bold font-sans py-20 leading-9">
          Get reliable and accurate travel information all on one site.
        </p>
        <Image src={loginimage} alt="logo" className="2xl:pt-10" priority />
      </div>
      <div className="h-2/3 w-screen lg:h-screen lg:w-2/3 flex flex-col items-center justify-center py-10 px-11 lg:px-52 gap-6 lg:gap-10 dark:bg-gray-900">
        <Toaster position="top-right" reverseOrder={false} />
        <div className=" flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl font-extrabold lg:leading-[42px] dark:text-white">
            Sign in to Trip Talkies
          </h1>

          <div className="flex flex-col-reverse gap-6 lg:flex-col items-center justify-center max-w-full">
            <button className="text-black dark:text-white font-extralight w-full max-h-max py-2 border-2 rounded-lg shadow-md lg:w-[75%]">
              <Image
                src={google}
                alt="Google logo"
                className="w-[10%] inline mr-6"
              />
              Sign In with Google
            </button>

            <form onSubmit={onLogin} className="mt-4 w-full lg:w-[75%]">
              <div className="mb-4">
                <label htmlFor="email" className="block text-black dark:text-white text-lg">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="border-2 rounded-lg w-full py-2 px-4 text-black dark:text-white bg-[#efefef] dark:bg-gray-700"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-black dark:text-white text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border-2 rounded-lg w-full py-2 px-4 text-black dark:text-white bg-[#efefef] dark:bg-gray-700"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="text-right">
                <p
                  className="text-right cursor-pointer text-purple-500 dark:text-purple-400 text-sm font-normal hover:text-purple-600 dark:hover:text-purple-500 ease-in-out duration-300  hover:font-medium underline"
                  onClick={() => setIsForgotPasswordOpen(true)}
                >
                  Forgot Password?
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className={`${
                    buttonDisabled || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-violet-400 hover:bg-violet-500"
                  } ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg text-lg w-full`}
                  onClick={onLogin}
                  disabled={buttonDisabled || loading}
                >
                  {loading ? "Signing you in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-3">
            <span className="text-stone-300 dark:text-stone-500 text-[13px] font-normal">
              Not a member yet?{" "}
            </span>
            <Link
              href="/signup"
              className="text-purple-500 dark:text-purple-400 text-[13px] font-semibold underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-[350px] relative flex items-center flex-col justify-center">
            <button
              className="absolute top-2 right-2 text-gray-300 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl focus:outline-none"
              onClick={closeForgotPasswordPopup}
            >
              &times;
            </button>
            {resetPasswordSuccess ? (
              <>
                <h2 className="text-center text-3xl font-extrabold  leading-[42px] pt-4">
                  All Done!
                </h2>
                <p className="w-[319px] text-center text-neutral-600 dark:text-neutral-400 text-sm font-semibold p-8">
                  If an account exists for {email}, you will get an email with
                  instructions on resetting your password. If it doesn&apos;t
                  arrive, be sure to check your spam folder.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold pt-8 text-center">
                  Forgot Your Password?
                </h2>
                <p className="w-72 text-center text-neutral-500 dark:text-neutral-400 text-sm font-normal pt-4">
                  Don&apos;t worry! Enter the email address you&apos;re using
                  for your account below, and we will send you a password reset
                  link.
                </p>
                <form
                  onSubmit={handleForgotPasswordSubmit}
                  className="mt-4 flex items-center flex-col"
                >
                  <div className="mb-4 pt-3">
                    <label
                      htmlFor="email"
                      className="block text-black dark:text-white text-lg font-semibold"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="border-2 rounded-lg w-full py-2 px-4 text-black dark:text-white bg-[#efefef] dark:bg-gray-700"
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
