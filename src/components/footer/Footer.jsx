import { useSelector } from "react-redux";
import style from "./Footer.module.css";

function Footer() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  return (
    <>
      <footer className={isDarkMode ? style.footer : style.footerdark}>
        <p>Réalisé avec ❤️ par moi même</p> <p>Version 1.04</p>
      </footer>
    </>
  );
}

export default Footer;
