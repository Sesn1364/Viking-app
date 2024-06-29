// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import CarouselMenu from '../../components/carousel menu/CarouselMenu';
import ContentSection from '../../components/content section/ContentSection';

const sections = ['Section 1', 'Section 2', 'Section 3', 'Section 4' , 'Section 5' , 'Section 6' , 'Section 7' , 'Section 8' , 'Section 9' , 'Section 10'];

const Menu = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const swiperRef = useRef(null);
  const isManuallyControlled = useRef(false);

  const handleCarouselClick = (index) => {
    isManuallyControlled.current = true;
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
    
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  
    setTimeout(() => {
      isManuallyControlled.current = false;
    }, 1000); 
  };
  
  const handleScroll = () => {
    if (isManuallyControlled.current) return;

    const sectionOffsets = sectionRefs.current.map(ref => ref.offsetTop);
    const scrollPosition = window.scrollY + window.innerHeight / 1;

    const currentSection = sectionOffsets.findIndex((offset, index) =>
      scrollPosition >= offset && (index === sectionOffsets.length - 1 || scrollPosition < sectionOffsets[index + 1])
    );

    if (currentSection !== -1 && currentSection !== activeSection) {
      setActiveSection(currentSection);
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(currentSection);
      }
    }
  };  
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  

  return (
    <div>
      <CarouselMenu
        sections={sections}
        activeSection={activeSection}
        onClick={handleCarouselClick}
        ref={swiperRef}
      />
      <div className="pt-24">
        {sections.map((section, index) => (
          <ContentSection
            key={index}
            section={section}
            index={index}
            ref={el => sectionRefs.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
