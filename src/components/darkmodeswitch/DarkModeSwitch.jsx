import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store";
import style from "./DarkModeSwitch.module.css";

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className={style.equipment}>
      <label className={style.switch}>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => dispatch(toggleDarkMode())}
        />
        <div className={style.button}>
          <div className={style.light}></div>
          <div className={style.dots}></div>
          <div className={style.characters}></div>
          <div className={style.shine}></div>
          <div className={style.shadow}></div>
        </div>
      </label>
    </div>
  );
};

export default DarkModeSwitch;
