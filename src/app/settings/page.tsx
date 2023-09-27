"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarLoggedIn from "@/components/Navbar-LoggedIn/page";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [deletionMessage, setDeletionMessage] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [isConfirmationError, setIsConfirmationError] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleConfirmDelete = async () => {
    try {
      // Check if the provided email matches the email returned from the profile route
      const profileResponse = await axios.post("/api/users/profile");
      const profileEmail = profileResponse.data.user.email;


      if (confirmationEmail === profileEmail) {
        // Email matches, proceed with deletion
        const response = await axios.post("/api/users/delete");

        if (response.status === 200) {
          toast.success(
            "Your account has gone on a vacation to the digital abyss! 🏝️"
          );
          setDeletionMessage("Account deleted successfully! 🎉");
          await axios.get("/api/users/logout");
          toast.success("You're now free as a bird! 🦜🌟");
          router.push("/");
        } else {
          toast.error("Oops! Your account decided to stay a little longer. 😅");
          setDeletionMessage("Account deletion failed. 😞");
        }
      } else {
        // Incorrect email provided
        setIsConfirmationError(true);
        setEmail(""); // Clear the input field
      }
    } catch (error) {
      toast.error("Your account encountered a technical glitch. 🤖");
      setDeletionMessage("An error occurred while deleting the account. 😢");
    }
  };

  return (
    <div>
      <div className="h-screen w-screen bg-[#090909]">
        <NavbarLoggedIn />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#acacac] font-bold text-3xl">Settings</h1>
          <hr />
          <div className="flex gap-6 items-center justify-center">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Delete Your Account
              </h3>
              <p className="font-medium text-base text-[#acacac]">
                Delete your account and all account data
              </p>
            </div>
            <button
              onClick={handleOpenPopup} // Open the confirmation dialog
              className="bg-red-500 hover:bg-red-800 ease-in-out duration-500 rounded-lg text-center text-white text-sm font-semibold py-2 px-5"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-[350px] relative flex items-center flex-col justify-center">
            <button
              className="absolute top-2 right-2 text-gray-300 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl focus:outline-none"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold pt-8 text-center">
              Are You Sure?
            </h2>
            <p className="w-72 text-center text-neutral-500 dark:text-neutral-400 text-sm font-normal pt-4">
              We&apos;re sad to see you go! But to fully delete your account,
              please confirm your email address below.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
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
                  value={confirmationEmail}
                  onChange={(e) => setConfirmationEmail(e.target.value)}
                  className={`border-2 rounded-lg w-full py-2 px-4 ${
                    isConfirmationError ? "border-red-500" : "border-[#efefef]"
                  } text-black dark:text-white bg-[#efefef] dark:bg-gray-700`}
                />
                {isConfirmationError && (
                  <p className="text-red-500 text-sm mt-2">
                    Incorrect email address. Please try again.
                  </p>
                )}
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  className="bg-neutral-400 hover:bg-neutral-500 ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg text-sm max-w-max max-h-max"
                  onClick={handleClosePopup}
                >
                  Stay on TripTalkies
                </button>
                <button
                  type="submit"
                  className="bg-red-400 hover:bg-red-500 ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg text-sm max-w-max"
                  onClick={handleConfirmDelete}
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
