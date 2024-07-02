// ../../components/carousel menu/CarouselMenu
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { RxDashboard } from "react-icons/rx";

const CarouselMenu = React.forwardRef(({ sections, activeSection, onClick }, ref) => {
  const [slidesPerView, setSlidesPerView] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 768) {
        setSlidesPerView(4);
      } else if (window.innerWidth <= 1270) {
        setSlidesPerView(5);
      } else {
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
    <div className="sm:w-[99%] w-full bg-gray-700 bg-opacity-95 shadow-2xl p-2 mt-4 fixed z-50 rounded-3xl border-2 border-gray-300">
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
          <SwiperSlide key={index} className="swiper-slide">
            <div
              onClick={() => onClick(index)}
              className={`cursor-pointer rounded-full text-white text-center flex items-center justify-between ${activeSection === index ? 'bg-gray-500 py-1 pr-4 pl-5 w-36 h-14' : 'bg-gray-500 p-2 w-14 h-14'} transition-all duration-300`}
            >
              {activeSection === index ? (
                <img src={section.img} alt={section.title} className="max-w-8 max-h-8 mb-2 object-contain filter brightness-0 invert" />
              ) : (
                <img src={section.img} alt={section.title} className="max-w-8 max-h-8 mb-2 object-contain m-auto filter brightness-0 invert" />
              )}
              {activeSection === index && (
                <div className='text-sm max-w-24'>{section.title}</div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='bg-slate-700 w-20 absolute left-0 top-0 h-full rounded-l-3xl z-50 flex items-center'>
        <div className='w-5/6 h-5/6 flex absolute left-1 rounded-full border-secondary p-2 ltr:border-l-2 rtl:border-r-2'>
          <RxDashboard color="white" size={32} className='m-auto cursor-pointer' />
        </div>
      </div>
    </div>
  );
});

export default CarouselMenu;

