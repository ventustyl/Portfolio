import { useRef } from "react";
import styles from "./Box.module.css";

const boxesData = [
  { size: "size2", color: "color2" },
  { size: "size1", color: "color1" },
  { size: "size4", color: "color4" },
  { size: "size1", color: "color1" },
  { size: "size3", color: "color3" },
  { size: "size4", color: "color4" },
  { size: "size2", color: "color2" },
  { size: "size1", color: "color3" },
  { size: "size3", color: "color3" },
  { size: "size1", color: "color1" },
  { size: "size2", color: "color2" },
  { size: "size1", color: "color1" },
  { size: "size4", color: "color4" },
  { size: "size1", color: "color1" },
  { size: "size3", color: "color3" },
  { size: "size2", color: "color2" },
  { size: "size4", color: "color4" },
  { size: "size1", color: "color1" },

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
        />
      ))}
    </div>
  );
};

export default Boxes;
