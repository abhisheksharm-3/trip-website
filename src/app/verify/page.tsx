"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setLoading(false); // Mark loading as complete
    } catch (error) {
      setError(true);
      setLoading(false); // Mark loading as complete
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div style={{ backgroundImage: "url('/images/homepage-main.jpeg')" }} className="bg-cover bg-center bg-no-repeat overflow-x-hidden">
        <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen py-2" >

      <div className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-4xl font-semibold mb-4">Verify Your Email!</h1>
        {loading ? ( // Show loading message while verifying
          <p className="text-gray-600 mb-4">Verifying email...</p>
        ) : (
          <p className="text-gray-600 mb-4">{token ? `Token: ${token}` : "No token"}</p>
        )}

        {verified ? (
          <div>
            <h2 className="text-2xl text-green-600 mb-4">Email Verified, Continue to Login</h2>
            <Link href="/login">
              <a className="bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600">Login</a>
            </Link>
          </div>
        ) : error ? (
          <div>
            <h2 className="text-2xl text-red-600 mb-4">Error</h2>
            <p className="text-gray-600">There was an error verifying your email.</p>
          </div>
        ) : null}
      </div>
      </div>
    </div>
  );
}
