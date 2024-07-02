// // ../../components/content section/ContentSection
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentSection = React.forwardRef(({ section, index }, ref) => {
  const [menuItems, setMenuItems] = useState({ 
    salads: [], appetizers: [], sushi: [],
    mainMeatDish: [], pasta: [], mainFoodSea: [],
    mainFoodChickens: [], mocktailBar: [], hotBar: [],
    dessert: [], teaBar: [], iceCoffee: [], hookahSpecial: [] });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/foods');
        const { سالادها: salads, "پیش غذا": appetizers,
          "Sushi": sushi, "غذای اصلی گوشتی": mainMeatDish, "پاستا": pasta,
          "غذای اصلی دریا": mainFoodSea, "غذای اصلی ماکیان": mainFoodChickens,
          "ماکتل بار": mocktailBar, "بار گرم": hotBar,
          "دسر": dessert, "چای بار": teaBar, "آیس کافی": iceCoffee, "قلیان Hookah Special": hookahSpecial } = response.data;
        setMenuItems({ salads, appetizers, sushi, mainMeatDish, pasta, mainFoodSea, mainFoodChickens, mocktailBar, hotBar, dessert, teaBar, iceCoffee, hookahSpecial });
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const renderItems = (items) => {
    return items.map((item) => {
      if (
        item.name === "کریزی پشن|Crzzy Passion" ||
        item.name === "وینوروسو|Winorosso" ||
        item.name === "پشن موهیتو|Passion Mojito" ||
        item.name === "اورنج فیز|orange Fizz" ||
        item.name === "فراست چوکو|Frost Choco" ||
        item.name === "پاریس برست" ||
        item.name === "رز گاردن" ||
        item.name === "چیز کیک لیمو" ||
        item.name === "بابا تبریزی" || 
        item.name === "فرزیه" || 
        item.name === "اکلر قهوه"  
      ) {
        return (
          <div key={item.id} className="flex p-6 h-64 relative bg-cover bg-center rounded-2xl my-2" style={{ backgroundImage: `url(${item.bgImg})` }}>
          <div className="absolute bottom-0 ">
            <p className="text-white">{item.name}</p>
            <p className='text-white'>{item.desc}</p>
            <p className="text-white">{item.price} هزار تومان</p>
          </div>
        </div>
        );
      } else if (item.name === "چای لاته" || item.name === "دمنوش گلدن وانیلا") {
        return (
          <div key={item.id} className="flex bg-gray-700 p-6">
          <div className="relative w-full pr-6 h-32">
            <p className="absolute top-0 text-white">{item.name}</p>
            <p className='absolute top-2/4 text-white'>{item.desc}</p>
            <p className="absolute bottom-0 text-white">{item.price}هزار تومان</p>
          </div>
        </div>
        )
      } else if (item.name === "Hookah Special") {
        return (
          <div key={item.id} className="flex bg-gray-700 p-6">
            <img src={item.img} alt={item.name} className="w-28 h-32" />
          <div className="relative w-full pr-6 h-32">
            <p className="absolute top-0 text-white">{item.name}</p>
            <p className='absolute top-2/4 text-white'>{item.desc}</p>
          </div>
        </div>
        )
      } else {
        return (
          <div key={item.id} className="flex bg-gray-700 p-6 my-2 rounded-2xl section">
          <img src={item.img} alt={item.name} className="w-28 h-32" />
          <div className="relative w-full pr-6">
            <p className="absolute top-0 text-white">{item.name}</p>
            <p className='absolute top-2/4 text-white'>{item.desc}</p>
            <p className="absolute bottom-0 text-white">
            {(item.name === "سلکشن کلاسیک|Classic selection" ||
               item.name === "استیک ریب آی" ||
               item.name === "شاه میگوی گریل با سس سالسا گوجه" ||
               item.name === "ماهی حلوای مراکشی با سس سبزیجات" ||
               item.name === "ماهی سوف با سس عدس" ||
               item.name === "ماهی سوف با سس بالزامیک" ||
               item.name === "ماهی سالمون با سس لمون باتر") ? `${item.price} میلیون تومان` : `${item.price} هزار تومان`}
              </p>
          </div>
        </div>
        );
      }
    });
  };
  
return (
    <div className='my-2'>
      <div class="flex items-center">
        <div class="flex-1 border-t border-secondary"></div>
        <div class="mx-4 font-bold text-gray-200 text-md">{section}</div>
        <div class="flex-1 border-t border-secondary"></div>
      </div>
      <div ref={ref} className="bg-black my-2">
        {section === "سالادها" && renderItems(menuItems.salads)}
        {section === "پیش غذا" && renderItems(menuItems.appetizers)}
        {section === "sushi" && renderItems(menuItems.sushi)}
        {section === "غذای اصلی گوشتی" && renderItems(menuItems.mainMeatDish)}
        {section === "پاستا" && renderItems(menuItems.pasta)}
        {section === "غذای اصلی دریا" && renderItems(menuItems.mainFoodSea)}
        {section === "غذای اصلی ماکیان" && renderItems(menuItems.mainFoodChickens)}
        {section === "ماکتل بار" && renderItems(menuItems.mocktailBar)}
        {section === "بار گرم" && renderItems(menuItems.hotBar)}
        {section === "دسر" && renderItems(menuItems.dessert)}
        {section === "چای بار" && renderItems(menuItems.teaBar)}
        {section === "آیس کافی" && renderItems(menuItems.iceCoffee)}
        {section === "قلیان Hookah Special" && renderItems(menuItems.hookahSpecial)}
      </div>
    </div>
  );
});

export default ContentSection;
