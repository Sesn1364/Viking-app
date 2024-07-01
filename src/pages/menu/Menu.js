// ./pages/menu/Menu
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import CarouselMenu from '../../components/carousel menu/CarouselMenu';
import ContentSection from '../../components/content section/ContentSection';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const swiperRef = useRef(null);
  const isManuallyControlled = useRef(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/foods');
        setMenuItems(response.data["menu-items"]);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

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

  if (!menuItems || menuItems.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <CarouselMenu
        sections={menuItems.map(item => ({
          title: item.title,
          img: item.img
        }))}
        activeSection={activeSection}
        onClick={handleCarouselClick}
        ref={swiperRef}
      />
      <div className="pt-24">
        {menuItems.map((item, index) => (
          <ContentSection
            key={index}
            section={item.title}
            index={index}
            ref={el => sectionRefs.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
