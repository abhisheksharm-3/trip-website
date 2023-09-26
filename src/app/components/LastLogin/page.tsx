import React from 'react';

import padlock from "../../../../public/images/padlock.svg"
import Image from 'next/image';

const LastLoginInfo = ({ lastLoginTime }: any) => {
  const dateObject = new Date(lastLoginTime);

  const formattedTime = dateObject.toLocaleTimeString();
  const formattedDate = dateObject.toLocaleDateString();

  return (
    <div className="relative flex flex-col gap-5 max-w-max items-center justify-center p-12 bg-blue-300 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 ">
      <Image className='absolute top-0 right-0' src={padlock} alt="lock"/>
      <h3 className='text-sm font-semibold'>Last Login</h3>
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="text-lg font-bold">{formattedTime}</div>
        <div className="text-xs font-semibold">{formattedDate}</div>
      </div>
    </div>
  );
};

export default LastLoginInfo;
