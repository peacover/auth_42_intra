import React from "react";
import fireEmoji from '../../Assets/fire-emoji.png'

const MyGames = () => {
  return (
    <div className="w-[766px] h-[377px] relative">
      <textarea
        className="w-[766px] min-h-[377px] max-h-[377px] px-[1.5rem] py-[1rem] rounded-[20px] bg-black text-white text-[14px] tracking-wider"
        name="myGames"
        id="myGames"
      ></textarea>
      <h1 className="absolute top-0 translate-y-[-50%] translate-x-[25%] flex items-center gap-[.5rem] w-fit bg-[#4FA48F] text-[#F2F2F2] text-[24px] font-[600] tracking-wider px-[28px] py-[5px] rounded-[10px]">Live Games <img src={fireEmoji} alt="fire" /></h1>
    </div>
  );
};

export default MyGames;
