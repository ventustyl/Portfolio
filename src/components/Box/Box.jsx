import { useRef } from "react";
import styles from "./Box.module.css";

const boxesData = [
  { size: "size2", color: "color2",  url: "https://www.udemy.com/certificate/UC-fe3055f0-5798-43ac-9a84-3b9fcfa07de0/", image: "../../../public/algo-js.webp"  },
  { size: "size1", color: "color1" ,  url: "https://www.sololearn.com/certificates/CT-FPL2OTLJ", image: "../../../public/coding-marketers.webp" },
  { size: "size3", color: "color4",  url: "https://www.sololearn.com/certificates/CC-EDNAF2WR", image: "../../../public/game-js.webp" },
  { size: "size1", color: "color1",  url: "https://www.sololearn.com/certificates/CC-I3F9BBTJ", image: "../../../public/javascript-intermediate.webp"  },
  { size: "size3", color: "color3",  url: "https://www.udemy.com/certificate/UC-d72b3f2c-88f5-422d-af32-5727738f39e3/", image: "../../../public/netlinking.webp"  },
  { size: "size3", color: "color4" ,  url: "https://www.sololearn.com/certificates/CC-E6JJMZEO", image: "../../../public/php.webp" },
  { size: "size1", color: "color2" ,  url: "https://www.udemy.com/certificate/UC-f663b594-1bc4-417a-898a-abf66cedf57d/", image: "../../../public/react-hooks.webp" },
  { size: "size3", color: "color3",  url: "https://www.freecodecamp.org/certification/VenturinoEric/responsive-web-design", image: "../../../public/responsive-web-design.webp"  },
  { size: "size3", color: "color3",  url: "https://www.sololearn.com/certificates/CT-DTYA6GON", image: "../../../public/web-dev-fundamentals.webp"  },
  { size: "size1", color: "color1",  url: "https://www.sololearn.com/certificates/CC-9GSZH0G0", image: "../../../public/web-dev.webp"  },
  { size: "size3", color: "color2" ,  url: "https://www.sololearn.com/certificates/CT-Y1UFDZ6I", image: "../../../public/responsive-web.webp" },
  { size: "size2", color: "color1",  url: "https://www.sololearn.com/certificates/CC-BNKXHDU9", image: "../../../public/redux.webp"  },
  { size: "size2", color: "color4",  url: "https://www.sololearn.com/certificates/CC-DERTHODD", image: "../../../public/python.webp"  },
  { size: "size2", color: "color1",  url: "https://www.udemy.com/certificate/UC-0e6ebc7b-7175-4789-b91c-3040aa82c2c2/", image: "../../../public/next.webp"  },
  { size: "size3", color: "color3",  url: "https://www.sololearn.com/certificates/CC-G287M80L", image: "../../../public/javascript.webp"  },
  { size: "size3", color: "color2",  url: "https://www.freecodecamp.org/certification/VenturinoEric/javascript-algorithms-and-data-structures-v8", image: "../../../public/javascript-algorithms.webp"  },
  { size: "size2", color: "color4" ,  url: "https://www.freecodecamp.org/certification/VenturinoEric/front-end-development-libraries", image: "../../../public/front-end.webp" },
  { size: "size3", color: "color1",  url: "https://www.udemy.com/certificate/UC-9cbfc0ab-ac9a-45a4-a556-123d28622140/", image: "../../../public/chat.webp"  },

];

const Boxes = () => {
  const boxRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const box = boxRefs.current[index];
    const rect = box.getBoundingClientRect();

    const threshold = 200; // distance en pixels par rapport aux bords

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Distance depuis chaque côté
    const distanceTop = rect.top;
    console.log(distanceTop);
    
    const distanceBottom = viewportHeight - rect.bottom;
    const distanceLeft = rect.left;
    const distanceRight = viewportWidth - rect.right;

    // On détermine précisément chaque proximité
    let originX = "50%";
    let originY = "50%";

    if (distanceLeft < threshold) originX = "0%";
    else if (distanceRight < threshold) originX = "100%";

    if (distanceTop < threshold) originY = "0%";
    else if (distanceBottom < threshold) originY = "100%";

    box.style.transformOrigin = `${originX} ${originY}`;
  };

  return (
    <div className={styles.content}>
      {boxesData.map((box, index) => (
        <div
          key={index}
          ref={(el) => (boxRefs.current[index] = el)}
          className={`${styles.box} ${styles[box.size]} ${styles[box.color]}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => window.open(box.url, "_blank")}
          style={{ backgroundImage: `url(${box.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        />
      ))}
    </div>
  );
};

export default Boxes;
