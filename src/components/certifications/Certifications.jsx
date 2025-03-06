import style from "./Certifications.module.css";
import { useSelector } from "react-redux";

export default function Certifications() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);



  return (
    <div className={isDarkMode ? style.container : style.containerdark}>
      <div className={style.titleContainer}>
      <h2 className={isDarkMode ? style.h2 : style.h2Dark}>Certifications</h2>
      </div>

     
    </div>
  );
}