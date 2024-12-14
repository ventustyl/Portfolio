import React from "react";
import style from "./Button.module.css";
import { useSelector } from "react-redux";

export default function Button({ name, onClick, url }) {
  // Vérifie si `name` est une fonction (icône) ou une URL (image)
  const IconComponent = typeof name === "function" ? name : null;
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div
        className={isDarkMode ? style.buttondark : style.button}
        onClick={onClick}
      >
        {IconComponent ? <IconComponent /> : <img src={name} alt="Bouton" />}
      </div>
    </a>
  );
}
