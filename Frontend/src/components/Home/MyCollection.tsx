import React from "react";
import collection from "../../Assets/collection.png";
import collection2 from "../../Assets/collection2.png";
import collection3 from "../../Assets/collection3.png";

const fakeData = [
  { img: collection, title: "Abstrac Girl" },
  { img: collection2, title: "Beautiful Flower" },
  { img: collection3, title: "Abstrac Color" },
];

const MyCollection = () => {
  return (
    <div>
      <h1 className="text-[21px] text-white font-[600] mb-[15px]">
        My collection
      </h1>
      <div className="flex gap-[27px]">
        {fakeData?.map((el) => (
          <div className="w-[185px] h-[275px] flex flex-col items-center bg-[#262626] rounded-[10px]">
            <img
              className="w-[174px] h-[182px] object-contain mt-[4px]"
              src={el?.img}
              alt={el?.title}
            />
            <h1 className="mt-[23.83px] text-[#ECEBF6] font-[500] tracking-wider">{el?.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollection;
