'use client';

import { useEffect, useState } from "react";

const images = [
  "3.jpg",
  "4.jpg",
  "7.jpg",
];

export const ImageBanner = () => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000); // 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[60vh] flex justify-center z-[-1]">
        <div className="relative w-[80%] overflow-hidden">
            {
                images.map((img, i) =>(
                    <img 
                        key={i}
                        src={img}
                        alt="banner"
                        className={`absolute w-full h-full transition-opacity duration-1000 
                            ${ i === index ? "opacity-100": "opacity-0"}`}
                    />
                ))
            }
        </div>
    </div>
  )
}
