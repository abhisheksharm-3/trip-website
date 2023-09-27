import React from "react";
import Image from "next/image";
import arrow from "../../../public/images/arrow-right.svg";
import plus from "../../../public/images/plus.svg"

const UpcomingTrip = ({ isAdmin }: any) => {
  const showAddTripButton = isAdmin;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-36 text-opacity-80">
        <h3 className="text-sm font-bold uppercase cursor-pointer">
          Upcoming Trips
        </h3>
        <div className="flex items-center justify-center cursor-pointer">
          <h3 className="text-[13px] font-medium hover:text-gray-300 ease-in-out duration-500">See More</h3>
          <Image src={arrow} alt="arrow" />
        </div>
      </div>
     
      <div className="relative flex flex-col gap-5 max-w-max items-center justify-center px-24 py-8 bg-teal-100 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60"> <p className="text-base font-semibold">No trips scheduled.</p>
        {showAddTripButton ? (
          <button className="bg-white bg-opacity-25 rounded-md border hover:bg-gray-100 ease-in-out duration-5y
          00 border-zinc-100 justify-center items-center gap-3 inline-flex text-white font-medium py-2 px-4">
            <Image src={plus} alt="plus icon" className="-translate-y-[1px]"/>
            Add New Trip
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UpcomingTrip;
