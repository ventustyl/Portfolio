import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";
import Navbar from "./components/navbar/Navbar";

import SlideContainer from "./components/slidercontainer/SliderContainer";
import Skills from "./components/skills/Skills";
import Hero from "./components/hero/Hero";
import Portfolio from "./components/portfolio/Portfolio";

function App() {
  const [loading, setLoading] = useState(true);
  const [showOrientationError, setShowOrientationError] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [loading]);

  useEffect(() => {
    const handleOrientationChange = () => {
      const { innerWidth, innerHeight } = window;
      const isLandscape = innerWidth > innerHeight - 66;
      const isTabletOrSmaller = innerWidth <= 1024;

      // Show error only if the device is in landscape mode and width matches criteria
      setShowOrientationError(isLandscape && isTabletOrSmaller);
    };

    // Add event listener
    window.addEventListener("resize", handleOrientationChange);

    // Trigger check on mount
    handleOrientationChange();

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };

    // Check initial orientation and screen size
    handleOrientationChange();

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      {showOrientationError ? (
              <div
              className={
                isDarkMode ? "orientation-error-dark" : "orientation-error"
              }
            >
          <p>
            Ce site ne fonctionne qu'en mode portrait pour les écrans de moins
            plus de 1024px de large.
          </p>
          <p> Veuillez tourner votre appareil.</p>
        </div>
      ) : loading ? (
        <Loader setLoading={setLoading} />
      ) : (
        <>
          <Navbar />
          <SlideContainer>
            <Hero />
            <Portfolio />
             <Skills /> 
          </SlideContainer>
        </>
      )}
    </div>
  );
}

export default App;
