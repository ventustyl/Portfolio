import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import style from "./Loader.module.css";

function Loader({ setLoading }) {
  const controls = useAnimation();

  useEffect(() => {
    // Lancer l'animation dès que le composant est monté
    controls
      .start({
        width: "100%",
        transition: { duration: 2, ease: "easeInOut" },
      })
      .then(() => {
        // Définir un délai pour la disparition du loader après l'animation
        setTimeout(() => {
          controls
            .start({
              opacity: 0,
              transition: { duration: 0.5 },
            })
            .then(() => {
              setLoading(false); // Terminer le chargement
            });
        }, 500);
      });
  }, [controls, setLoading]);

  return (
    <motion.div
      className={style.loader}
      initial={{ width: "0%", opacity: 1 }}
      animate={controls}
    />
  );
}

export default Loader;
