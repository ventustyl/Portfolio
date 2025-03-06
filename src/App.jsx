import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";
import Navbar from "./components/navbar/Navbar";

import SlideContainer from "./components/slidercontainer/SliderContainer";
import Skills from "./components/skills/Skills";
import Hero from "./components/hero/Hero";
import Portfolio from "./components/portfolio/Portfolio";
import Certifications from "./components/certifications/Certifications";

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

      setShowOrientationError(isLandscape && isTabletOrSmaller);
    };

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    handleOrientationChange();

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
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
          <p style={{ lineHeight: "2rem", textAlign: "center" }}>
            Ce site ne fonctionne qu&apos;en mode portrait pour les écrans de
            moins plus de 1024px de large.
          </p>
          <p> Veuillez tourner votre appareil.</p>
        </div>
      ) : loading ? (
        <Loader setLoading={setLoading} />
      ) : (
        <>
          <Navbar />

          {innerWidth >= 1366 ? (
            <SlideContainer>
              <Hero />
              <Portfolio />
              <Certifications />
              <Skills />
            </SlideContainer>
          ) : (
            <SlideContainer>
              <Hero />
              <Portfolio />
              <Skills />
            </SlideContainer>
          )}
        </>
      )}
    </div>
  );
}

export default App;
