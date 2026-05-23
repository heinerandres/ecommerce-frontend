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
import { IProducto } from "@/src/interfaces/producto";

type Props = {
  producto: IProducto | null,
}


//export const ProductSlideshow = ({ images, title, className}: Props) => {
export const ProductoSlides = ({producto}: Props) => {

  const images = Object.keys(producto!)
  .filter(key => key.startsWith("img"))
  .map(key => producto![key as keyof typeof producto] as string)
  .filter(Boolean);

  console.log(images);


    const title = "producto.nombre";
    const className="";

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
            images.map( (image, index) =>(
                <SwiperSlide key={ index }>
                    <Image
                        width={ 1024 }
                        height={ 700 }
                        src={ image }
                        alt={ title }
                        className="rounded-lg"
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
            images.map( (image, index) =>(
                <SwiperSlide key={ index }>
                    <Image
                        width={ 300 }
                        height={ 1000 }
                        src={ image }
                        alt={ title }
                        className="rounded-lg object-fill cursor-pointer"
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>

    </div>
  )
}