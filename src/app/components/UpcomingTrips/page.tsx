import React from "react";
import Image from "next/image";
import arrow from "../../../../public/images/arrow-right.svg";

const UpcomingTrip = ({ isAdmin }: any) => {
  const showAddTripButton = isAdmin;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-16 text-opacity-80">
        <h3 className="text-sm font-bold uppercase cursor-pointer">Upcoming Trips</h3>
        <div className="flex items-center justify-center cursor-pointer">
          <h3 className="text-[13px] font-medium">See More</h3>
          <Image src={arrow} alt="arrow" />
        </div>
      </div>
      <div className="relative flex flex-col gap-5 max-w-max items-center justify-center p-12 bg-teal-100 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60">
        {showAddTripButton ? (
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Trip
          </button>
        ) : (
          <p className="text-lg font-semibold">No trips scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingTrip;
