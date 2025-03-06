import style from "./Hero.module.css";
import { useSelector } from "react-redux";

export default function Hero() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div>
      <div className={`${isDarkMode ? style.container : style.containerdark}`}>
        <div className={style.textTitle}>
          <h1>
            Dev Web Fullstack & <br />
            Intégrateur Web
          </h1>
          <div className={style.text}>
            <p className={style.paragraph}>
              Avec 8 années d'expérience dans la réalisation de projets
              WordPress, je prends en charge l'ensemble du processus, depuis
              l'élaboration des besoins jusqu'à la mise en ligne. J'interviens
              également en conseil stratégique et en amélioration de l'interface
              et de l'expérience utilisateur, afin d'offrir des solutions
              optimisées et adaptées aux attentes des utilisateurs. <br />
              Par ailleurs, mes deux années en développement Fullstack JS m’ont
              permis de concevoir des applications web et mobiles performantes
              et fiables.
            </p>

            <div className={style.text2}>
              <p className={style.paragraph2}>
                Vous cherchez un développeur passionné pour renforcer votre
                équipe ?
              </p>
              <p className={style.paragraph}>
                Ce que je peux vous apporter :<br />
                <br />
                - Compétence technique et polyvalence
                <br />
                - Rigueur et organisation
                <br />
                - Capacités en communication et travail en équipe
                <br />- Expérience en UI/UX et orienté utilisateur
              </p>
            </div>
            <p className={style.paragraph3}>
              <span
                className={`${isDarkMode ? style.effect : style.effectdark}`}
              >
                <a href="mailto:eric.venturino@orange.fr">Contactez-moi</a>
              </span>
              <span>
                , je suis prêt à explorer de nouvelles opportunités et à relever
                vos défis !
              </span>
            </p>
            <p className={style.paragraph}>
              Je suis à l’écoute pour un CDI ou mission Freelance.
            </p>
          </div>
        </div>
        <div className={style.img}></div>
      </div>
      <div className={`${isDarkMode ? style.message : style.messageDark}`}>
        <div>
          <span>Developpeur Web Fullstack - </span>
          <span>Creation WordPress - </span>
          <span>Integrateur web - </span>

          <span>Developpeur Web Fullstack -</span>
          <span>Creation WordPress -</span>
          <span>Integrateur web -</span>
        </div>
      </div>

      <div className={`${isDarkMode ? style.arrow : style.arrowdark}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
