import React from "react";
import Navbar from "../Navbar/page";
import Image from "next/image";
import construction from "../../../../public/images/construction.svg";

const ConstructionPage = () => {
  return (
    <div className="bg-[#090909] overflow-x-hidden">
      <Navbar />
      <div className=" flex flex-col w-screen items-center justify-center h-screen text-[#acacac]">
        <Image src={construction} alt="construction" />
        <p className="w-[439px] h-[72px] text-[26px] font-extrabold leading-9">
          This page is under construction.
        </p>
        <div className="w-[439px] h-[25px] text-center text-base font-normal ">
          Please check back later.
        </div>
      </div>
    </div>
  );
};

export default ConstructionPage;
