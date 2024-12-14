
import React, { useState, useEffect, useRef } from 'react';
import style from './SliderContainer.module.css';

const SlideContainer = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContainerRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  // Fonction pour passer à une diapositive spécifique
  const scrollToSlide = (index) => {
    const slides = React.Children.toArray(children);
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    if (currentSlide === index) return;

    setCurrentSlide(index);
  };

  // Gestion du défilement par molette
  const handleWheel = (event) => {
    event.preventDefault();
    if (isScrolling.current) return;

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);

    if (event.deltaY > 0) {
      scrollToSlide(currentSlide + 1);
    } else {
      scrollToSlide(currentSlide - 1);
    }
  };

  // Gestion du défilement tactile
  const handleTouchStart = (event) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (isScrolling.current) return;

    const touchEndY = event.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);

    if (deltaY > 0) {
      scrollToSlide(currentSlide + 1); // Glisser vers le haut
    } else if (deltaY < 0) {
      scrollToSlide(currentSlide - 1); // Glisser vers le bas
    }
  };

  // Ajouter les événements de défilement
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentSlide]);

  // Appliquer la transformation de défilement en fonction de l'index de la diapositive
  useEffect(() => {
    const targetPosY = currentSlide * 100; // Utilisation de 100vh pour chaque diapositive
    slideContainerRef.current.style.transform = `translateY(-${targetPosY}vh)`;
  }, [currentSlide]);

  return (
    <div className={style.slideContainer} ref={slideContainerRef}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`${style.slide} ${index === currentSlide ? style.active : ''}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default SlideContainer;
