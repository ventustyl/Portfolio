import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from "./Portfolio.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import projet1 from "../../../public/projet1.webp";
import projet2 from "../../../public/react.webp";
import prochainement from "../../../public/prochainement.webp";

export default function Project() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

  // Hook pour détecter le redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const projects = [
    {
      img: projet1,
      alt: "Markdown Converter",
      description: "Convertisseur Markdown en ligne pour github",
      techno: "React 19 + Taillwind",
      link: "/markdown/",
    },
    {
      img: projet2,
      alt: "React project",
      description: "Prochainement en cours de construction",
      techno: "Next 15.1 + GSAP",
      link: "https://framework-puce.vercel.app/",
    },
    {
      img: prochainement,
      alt: "Project 3  [en cours]",
      description: "Prochainement en cours de construction",
      techno: "Prochainement",
    },
    {
      img: prochainement,
      alt: "Project 4  [en cours]",
      description: "Prochainement en cours de construction",
      techno: "Prochainement",
    },
    {
      img: prochainement,
      alt: "Project 5  [en cours]",
      description: "Prochainement en cours de construction",
      techno: "Prochainement",
    },
  ];

  return (
    <div className={`${isDarkMode ? style.container : style.containerdark}`}>
      {isSmallScreen ? (
        // Affichage pour écrans petits
        <div
          className={`${
            isDarkMode ? style.containerFolio : style.containerFolioDark
          }`}
        >
          <h2 className={`${isDarkMode ? style.h2 : style.h2Dark}`}>
            Portfolio
          </h2>
          <div className={style.textTitle}>
            <div className={style.project}>
              <div
                className={`${
                  isDarkMode ? style.projectDiv : style.projectDivDark
                }`}
              >
                <a href="/markdown/" target="blank">
                  <img
                    className={style.img}
                    src={projet1}
                    alt="Markdown converter"
                  />
                </a>
              </div>

              <div
                className={`${
                  isDarkMode ? style.projectDiv : style.projectDivDark
                }`}
              >
                <a href="https://framework-puce.vercel.app/" target="blank">
                  <img
                    className={style.img}
                    src={projet2}
                    alt="Framework React"
                  />
                </a>
              </div>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`${
                    isDarkMode ? style.projectDiv : style.projectDivDark
                  }`}
                >
                  <img
                    className={style.img}
                    src={prochainement}
                    alt="Prochainemen"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Affichage pour écrans larges
        <>
          <div
            className={`${
              isDarkMode ? style.containerFolio : style.containerFolioDark
            }`}
          >
            <h2 className={`${isDarkMode ? style.h2 : style.h2Dark}`}>
              Portfolio
            </h2>
            <div className={style.imgMe}></div>
          </div>
          <div className={style.textTitle}>
            <h2 className={style.h3}>Développeur</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              loop
              breakpoints={{
                0: { slidesPerView: 1 },
                1000: { slidesPerView: 3 },
                1300: { slidesPerView: 4 },
              }}
              className={style.slideContent}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className={style.card}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={style.imageContent}>
                      <span className={style.overlay}></span>
                      <div className={style.cardImage}>
                        <img
                          src={project.img}
                          alt={project.alt}
                          className={style.cardImg}
                        />
                      </div>
                    </div>
                    <div className={style.cardContent}>
                      <h3
                        className={`${
                          isDarkMode ? style.name : style.nameDark
                        }`}
                      >
                        {project.alt}
                      </h3>
                      <p
                        className={`${
                          isDarkMode ? style.description : style.descriptionDark
                        }`}
                      >
                        Description: {project.description}
                      </p>
                      <p
                        className={`${
                          isDarkMode ? style.description : style.descriptionDark
                        }`}
                      >
                        Technologies: {project.techno}
                      </p>
                      <button
                        className={`${
                          isDarkMode ? style.buttonDark : style.button
                        }`}
                      >
                        Voir Plus
                      </button>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
}
