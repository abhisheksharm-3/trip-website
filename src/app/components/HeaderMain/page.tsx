import React from "react";

const HeaderMain = () => {
  return (
    <div className="h-screen px-6 lg:px-28 py-20">
      <div className="flex flex-col items-center lg:items-start">
        <div className=" text-center lg:text-left lg:w-[526px]">
          <div className="lg:hidden text-white text-[22px] font-extrabold font-sans leading-9">
            Access live travel updates, discussion forum, currency converter{" "}
            <p className="text-blue-400 inline">
              and more...
            </p>{" "}
            all on TripTalkies.
          </div>
          <div className="hidden lg:block">
            <p className="text-white text-[29px] font-bold font-sans leading-[43px]">
              Access live travel updates ✈️, discussion forum 💬,
              <br />
              currency converter 💵,
            </p>
            <p className="text-blue-400 text-[29px] font-bold font-sans leading-[43px]">
              and more...
            </p>
            <p className="text-white text-[29px] font-bold font-sans leading-[43px]">
              all on TripTalkies.
            </p>
          </div>
        </div>
        <button className="text-white my-7 py-2 px-5 lg:px-10 text- max-w-max lg:text-lg font-semibold text-center rounded-lg bg-blue-400 hover:bg-blue-500 ease-in-out duration-500">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeaderMain;
