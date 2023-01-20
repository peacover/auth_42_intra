import React from "react";
import Achievments from "../components/Home/Achievments";
import LastGames from "../components/Profile/LastGames";
import ProfileUp from "../components/Profile/ProfileUp";

const Profile = () => {
  return (
    <div className="w-[1021px] min-h-screen">
      <h1 className="text-[77px] text-[#F2F2F2] text-center font-[700] tracking-wider">
        Profile
      </h1>
      {/* ------ top part ------- */}
      <div className="mt-[62px]">
        <ProfileUp />
      </div>
      {/* ------ bottom part ------ */}
      <div className="mt-[144px] flex items-center gap-[44px]">
        <LastGames />
        <Achievments/>
        
      </div>
    </div>
  );
};

export default Profile;
