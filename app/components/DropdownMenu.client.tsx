// DropdownMenu.client.tsx
import React, { useState } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    { label: 'AI Recipes', link: 'https://immunifai.com/version-test/' },
    { label: 'Community Recipes', link: 'https://www.example.com' },
    { label: 'AI Assistant', link: 'https://www.example.com' },
    { label: 'Food Scanner', link: 'https://www.example.com' },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>☰</button>
      {isOpen && (
        <div>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
          <ul>
            <li>
              <a href={carouselItems[activeIndex].link}>{carouselItems[activeIndex].label}</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
