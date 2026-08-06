'use client';
import { useState } from "react";
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

type Props = {
  imagenes: {_id: string, producto: string, url: string}[] | null,
}

export const ProductoSlides = ({imagenes}: Props) => {
    const title = "Imagen";
    const base = "http://localhost:4000/uploads/";

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>(); 

  return (
    <div className = "">
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
    }
        spaceBetween={10}
        navigation={false}
        autoplay={{
          delay: 10000
        }}
        thumbs={{ 
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
         }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
            imagenes?.map( (image, index) =>(
                <SwiperSlide key={ index }>
                    <Image
                        width={ 1024 }
                        height={ 700 }
                        src={ base + image.url }
                        alt={ title }
                        className="rounded-lg"
                        unoptimized
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
            imagenes?.map( (image, index) =>(
                <SwiperSlide key={ index }>
                    <Image
                        width={ 300 }
                        height={ 1000 }
                        src={ base + image.url }
                        alt={ title }
                        className="rounded-lg object-fill cursor-pointer "
                        unoptimized
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>

    </div>
  )
}