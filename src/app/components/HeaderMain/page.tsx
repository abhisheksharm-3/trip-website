import React from "react";

const HeaderMain = () => {
  return (
    <div className="h-screen px-28 py-20">
      <div className="w-[526px]">
        <span className="text-white text-[29px] font-bold font-sans leading-[43px]">
          Access live travel updates ✈️, discussion forum 💬,
          <br />
          currency converter 💵,
          <br />
          and &nbsp;
        </span>
        <span className="text-blue-400 text-[29px] font-bold font-['Axiforma'] leading-[43px]">
          more...
        </span>
        <span className="text-white text-[29px] font-bold font-['Axiforma'] leading-[43px]">
          {" "}
          all on TripTalkies.
        </span>
      </div>
      <button className="text-white my-7 py-2 px-10 text-lg font-semibold text-center rounded-lg bg-blue-400 hover:bg-blue-500 ease-in-out duration-500">Get Started</button>
    </div>
  );
};

export default HeaderMain;
