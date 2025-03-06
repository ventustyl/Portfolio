import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SiReaddotcv } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../button/Button";
import DarkModeSwitch from "../darkmodeswitch/DarkModeSwitch";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${scrolled ? style.scrolled : ""} ${
        isDarkMode ? style.navbar : style.navbardark
      }`}
    >
      <div className={style.navbar_container}>
        <div className={style.navbar_logo}>
          <a className={style.title} href="/">
            Eric Venturino
          </a>
        </div>

        <nav className={style.navbar_links}>
          <Button
            className={style.navbar_button}
            name={FaLinkedinIn}
            url="https://www.linkedin.com/in/eric-venturino/"
          />
          <Button
            name={FiGithub}
            url="https://github.com/ventustyl"
            className={style.navbar_button}
          />
          <Button
            name={SiReaddotcv}
            url="https://drive.google.com/file/d/1IgofpBffLmJp80ovznw9cXU-wqU4Ofvb/view?usp=sharing"
          />
          <Button
            className={style.navbar_button}
            name={MdOutlineEmail}
            url="mailto:eric.venturino@orange.fr"
          />

          <li className={style.nav_item}>
            {/* Commutateur pour activer/désactiver le dark mode */}
            <DarkModeSwitch />
          </li>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
