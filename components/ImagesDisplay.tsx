"use client";
import Image from "next/image";
import React, { useState } from "react";

const ImagesDisplay = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="image-container">
        <Image
          width={300}
          height={300}
          src={images && images[index]}
          alt="Main Auction Image"
          className="rounded-lg bg-[#ebebeb] w-[300px] h-[300px] cursor-pointer transition-all hover:bg-[#f02d34]"
        />
      </div>
      <div className="flex gap-2 mt-4">
        {images?.map((item, i) => (
          <div className=" bg-[#f02d34] rounded-md">
            <Image
              key={i}
              src={item}
              width={70}
              height={70}
              className={
                i === index
                  ? "rounded-md  w-[70px] h-[70px] cursor-pointer bg-[#f02d34] opacity-50"
                  : " rounded-md bg-[#ebebeb] w-[70px] h-[70px] cursor-pointer"
              }
              onMouseEnter={() => setIndex(i)}
              alt="Small Auction Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesDisplay;
