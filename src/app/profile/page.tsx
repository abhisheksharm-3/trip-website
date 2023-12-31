"use client";
import React, { useEffect, useState } from "react";
import LastLoginInfo from "../../components/LastLogin/page";
import axios from "axios";
import NavbarLoggedIn from "../../components/Navbar-LoggedIn/page";
import toast from "react-hot-toast";
import UpcomingTrip from "../../components/UpcomingTrips/page";

const Profile = () => {
  const [userData, setUserData] = useState(null as any);
  const [lastLogin, setLastLogin] = useState(null as any)
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post("/api/users/profile");
        setUserData(response.data.user);
        setLastLogin(response.data.lastLogin);
      } catch (error: any) {
        setError(error);
        toast.error(`Error fetching user data: ${error.message}`);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="bg-[url('/images/profilebg-image.jpg')] bg-cover bg-repeat  w-screen h-screen">
      <NavbarLoggedIn />
      {userData ? (
        <div className="text-white px-6 lg:px-28">
          <h1 className="text-[32px] font-medium leading-[55px] sm:leading-[70px]">
            Welcome back, <br />{" "}
            <span className="text-4xl sm:text-5xl font-bold sm:font-extrabold">
              {(userData as { name: string } | null)?.name ?? "User"}!
            </span>
          </h1>
          <div className="flex gap-9 xs:gap-16 flex-col items-center justify-center sm:justify-start sm:flex-row px-4">
          <LastLoginInfo lastLoginTime={lastLogin} />
          <UpcomingTrip isAdmin ={userData.isAdmin} />
          {/* <div className="text-center mt-4">
        <p className="text-lg text-gray-300">
          Get weather updates from our sister service:
        </p>
        <a
          href="https://overcastly.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-lg font-semibold hover:underline"
        >
          Visit Overcastly
        </a>
      </div> */}
          </div>
        </div>
      ) : error ? (
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Error!</h1>
          <p>{(error as { message: string } | null)?.message ?? "404"}!</p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
