// // ../../components/carousel menu/CarouselMenu
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
          <SwiperSlide key={index} className="flex justify-center items-center !w-40">
            <div
              onClick={() => onClick(index)}
              className={`cursor-pointer rounded-full text-white text-center flex items-center justify-between ${activeSection === index ? 'bg-blue-500 py-2 pr-4 pl-5 w-36 h-14' : 'bg-gray-600 p-2 w-14 h-14'} transition-all duration-300`}
            >
              {activeSection === index ? (
                <img src={section.img} alt={section.title} className="max-w-8 max-h-8 mb-2 object-contain" />
              ) : (
                <img src={section.img} alt={section.title} className="max-w-8 max-h-8 mb-2 object-contain m-auto" />
              )}
              {activeSection === index && (
                <div className='text-sm max-w-24'>{section.title}</div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default CarouselMenu;

