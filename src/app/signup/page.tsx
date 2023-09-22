"use client"
import React, { useState } from "react";
import Image from "next/image";
import logo_dark from "../../../public/images/logo-dark.png";
import signupimage from "../../../public/images/signup-image.svg";
import google from "../../../public/images/google.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [showPasswordStrength, setShowPasswordStrength] = useState<boolean>(
    false
  );

  const onSignup = async () => {
    try {
      setLoading(true);
      setUser({
        name: firstName + " " + lastName,
        email: email,
        password: password,
      });
      const response: any = await axios.post("/api/users/signup", user);
      toast.success(response.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (email.length > 6 && password.length > 8 && firstName.length > 2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, firstName, password]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password strength checker
    if (newPassword.length < 6) {
      setPasswordStrength("Weak");
    } else if (newPassword.length < 10) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Strong");
    }

    // Show password strength meter when the user starts typing
    setShowPasswordStrength(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-1/3 w-screen lg:h-screen lg:w-1/3 bg-blue-200 px-8 lg:px-16 py-8 lg:py-16 flex flex-col items-center lg:items-start gap-10 lg:gap-0">
        <Image src={logo_dark} alt="logo" className="w-[70%]" />
        <p className="hidden lg:block text-black text-opacity-60 text-[26px] font-bold font-sans py-20 leading-9">
          Get reliable and accurate travel information all on one site.
        </p>
        <Image src={signupimage} alt="logo" className="2xl:pt-10" priority />
      </div>
      <div className="h-2/3 w-screen lg:h-screen lg:w-2/3 flex flex-col items-center justify-center py-10 lg:py-0 px-11 lg:px-52 gap-6 lg:gap-3">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-2xl lg:text-3xl font-extrabold lg:leading-[42px]">
          Sign Up to Trip Talkies
        </h1>

        <div className="flex flex-col-reverse lg:flex-col items-center justify-center">
          <button className="text-black font-extralight max-w-max max-h-max py-2 border-2 rounded-lg shadow-md lg:w-[75%] mt-4 lg:mt-0">
            <Image
              src={google}
              alt="Google logo"
              className="w-[10%] inline mr-6"
            />
            Sign In with Google
          </button>

          <form
            onSubmit={handleSubmit}
            className="mt-4 w-full lg:w-[75%]"
          >
            <div className="mb-2 flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-black text-lg"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border-2 rounded-lg w-full py-2 px-4 text-black bg-[#efefef]"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-black text-lg"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border-2 rounded-lg w-full py-2 px-4 text-black bg-[#efefef]"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-black text-lg">
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
            <div className="mb-2">
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
            <div
              className={`relative h-2 mt-1 ${
                showPasswordStrength ? "" : "hidden"
              }`}
            >
              <div
                className={`absolute h-full w-full rounded-lg ${
                  passwordStrength === "Weak"
                    ? "bg-red-400" // Red for weak password
                    : passwordStrength === "Moderate"
                    ? "bg-orange-400" // Orange for moderate password
                    : "bg-green-400" // Green for strong password
                }`}
                style={{
                  width:
                    passwordStrength === "Weak"
                      ? "33.33%" // 1/3 width for weak password
                      : passwordStrength === "Moderate"
                      ? "66.66%" // 2/3 width for moderate password
                      : "100%", // 100% width for strong password
                }}
              ></div>
            </div>
            <div
              className={`mt-2 text-sm text-center ${
                passwordStrength === "Weak"
                  ? "text-red-400" // Red for weak password
                  : passwordStrength === "Moderate"
                  ? "text-orange-400" // Orange for moderate password
                  : "text-green-400" // Green for strong password
              } ${showPasswordStrength ? "" : "hidden"}`}
            >
              {passwordStrength === "Weak"
                ? "Weak 👎"
                : passwordStrength === "Moderate"
                ? "Moderate 👍"
                : "Strong 👌"}
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className={`${
                  buttonDisabled || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-500"
                } ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg text-lg w-full`}
                onClick={handleSubmit}
                disabled={buttonDisabled || loading}
              >
                {loading ? "Signing you up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <span className="text-stone-300 text-[13px] font-normal">
            Already a Member?{" "}
          </span>
          <Link
            href="/login"
            className="text-blue-500 text-[13px] font-semibold underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
