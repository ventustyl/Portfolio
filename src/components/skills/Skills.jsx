import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./Skills.module.css";
import Footer from "../footer/Footer";
import Avalanche from "../avalanche/Avalanche";

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));

    this.queue = Array.from({ length }, (_, i) => ({
      from: oldText[i] || "",
      to: newText[i] || "",
      start: Math.floor(Math.random() * 40),
      end: Math.floor(Math.random() * 40) + Math.floor(Math.random() * 40),
    }));

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    const output = this.queue.reduce(
      (acc, { from, to, start, end, char }, i) => {
        if (this.frame >= end) {
          return acc + to;
        }
        if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            this.queue[i].char = this.randomChar();
          }
          return (
            acc + `<span class="${style.dud}">${this.queue[i].char}</span>`
          );
        }
        return acc + from;
      },
      ""
    );

    this.el.innerHTML = output;

    if (this.queue.every(({ end }) => this.frame >= end)) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Configuration des sections
const SECTIONS_CONFIG = {
  Languages: {
    items: ["HTML", "CSS", "Javascript", "PHP", "Python", "Typescript"],
    delay: 4500,
  },
  Frameworks: {
    items: [
      "React JS",
      "Express JS",
      "Next JS",
      "SCSS",
      "Tailwind CSS",
      "Django",
    ],
    delay: 3500,
  },
  Modeling: {
    items: ["MERISE", "UML", "SQL", "MongoDB"],
    delay: 4000,
  },
  "Content Management": {
    items: [
      "WordPress",
      "Divi",
      "Elementor",
      "Chat GPT",
      "Yoast SEO",
      "Math Rank",
    ],
    delay: 3500,
  },
  Conception: {
    items: ["UI/UX Design", "Figma", "Agile method"],
    delay: 3700,
  },
  "Designs Pattern": {
    items: ["POO", "Test unitaire", "Documentation Technique", "MVC"],
    delay: 4700,
  },
  Outils: {
    items: ["VS Code", "Postman", "GitHub", "PhpMyAdmin"],
    delay: 3800,
  },
  "Gestion de projet": {
    items: ["Asana", "Slack", "Trello"],
    delay: 4500,
  },
  Librairies: {
    items: [
      "React Router",
      "Jest",
      "Redux",
      "UI Material",
      "Matter-JS",
      "JSON Web Token",
    ],
    delay: 5000,
  },
};

const AnimatedSection = ({ title, items, delay, reference }) => {
  useEffect(() => {
    if (!reference.current) return;

    const fx = new TextScramble(reference.current);
    let counter = 0;

    const next = () => {
      fx.setText(items[counter]).then(() => {
        setTimeout(next, delay);
      });
      counter = (counter + 1) % items.length;
    };

    next();

    return () => {
      cancelAnimationFrame(fx.frameRequest);
    };
  }, [items, delay, reference]);

  return (
    <>
      <p className={style.domain}>{title}</p>
      <div ref={reference} className={style.text}></div>
    </>
  );
};

export default function Skills() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const sectionRefs = Object.keys(SECTIONS_CONFIG).reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {});

  return (
    <div className={isDarkMode ? style.container : style.containerdark}>
      <h2 className={isDarkMode ? style.h2 : style.h2Dark}>Skills</h2>
      <div className={style.programmation}>
        {Object.entries(SECTIONS_CONFIG).map(([title, { items, delay }]) => (
          <AnimatedSection
            className={`${style.prog}`}
            key={title}
            title={title}
            items={items}
            delay={delay}
            reference={sectionRefs[title]}
          />
        ))}
      </div>
      <div className={style.avalanche}>
        <Avalanche />
      </div>
      <div className={style.img}></div>
      <Footer />
    </div>
  );
}
