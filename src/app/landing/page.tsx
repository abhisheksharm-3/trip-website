import React from "react";
import Navbar from "@/app/components/Navbar/page";
import HeaderMain from "@/app/components/HeaderMain/page";
//import Image from 'next/image'

const LandingPage = () => {
  return (
    <div className="bg-[url('/images/homepage-main.jpeg')] bg-cover bg-no-repeat lg:bg-center overflow-x-hidden">
      <Navbar />
      <HeaderMain />
    </div>
  );
};

export default LandingPage;