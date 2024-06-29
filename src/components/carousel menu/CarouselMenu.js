import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CarouselMenu = React.forwardRef(({ sections, activeSection, onClick }, ref) => {
  const [slidesPerView, setSlidesPerView] = useState(8); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 426) { 
        setSlidesPerView(1);
      } else if (window.innerWidth <= 600) {
        setSlidesPerView(2); 
      } else if (window.innerWidth <= 950) {
        setSlidesPerView(4); 
      }
       else {
        setSlidesPerView(8);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full z-10 bg-gray-800 p-4">
      <Swiper
        ref={ref}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        onSlideChange={(swiper) => onClick(swiper.activeIndex)}
        initialSlide={activeSection}
        pagination={{ clickable: true }}
      >
        {sections.map((section, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div
              onClick={() => onClick(index)}
              className={`cursor-pointer p-4 rounded-lg text-white text-center ${activeSection === index ? 'bg-blue-500' : 'bg-gray-600'} transition-all duration-300`}
            >
              {section}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default CarouselMenu;


