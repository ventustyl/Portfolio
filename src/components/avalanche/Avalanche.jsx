import { useEffect, useRef } from "react";
import Matter from "matter-js";
import "matter-wrap"; // Assurez-vous d'importer le plugin matter-wrap
import style from "./Avalanche.module.css";
import { useSelector } from "react-redux";

// Importez plusieurs images
import wordpress from "../../assets/img/wordpress-logo.png";
import react from "../../assets/img/react-logo.png";
import redux from "../../assets/img/redux-logo.png";
import python from "../../assets/img/python-logo.png";
import php from "../../assets/img/php-logo.png";

const Avalanche = () => {
  const avalancheRef = useRef(null);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const { Engine, Render, Runner, Composite, Composites, Common, MouseConstraint, Mouse, Bodies } = Matter;

    // Enregistrer le plugin matter-wrap
    Matter.use("matter-wrap");

    // Créer le moteur et le rendu
    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: avalancheRef.current,
      engine: engine,
      options: {
        width: 400,
        height: 300,
        background: "transparent", // Fond transparent
        wireframes: false // Désactive le wireframe pour voir la texture
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Tableau de textures d'images
    const textures = [wordpress, react, redux, php, python];

    // Fonction pour choisir une image aléatoire
    const getRandomTexture = () => textures[Math.floor(Math.random() * textures.length)];

    // Ajouter des boules avec des images en textures
    const stack = Composites.stack(20, 20, 5, 3, 0, 0, (x, y) => {
      return Bodies.circle(x, y, 20, {
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
        render: {
          sprite: {
            texture: getRandomTexture(), // Choisir une texture aléatoire
            xScale: 0.5, // Ajustez l'échelle si nécessaire
            yScale: 0.5
          }
        }
      });
    });

    Composite.add(world, stack);

    // Définir la couleur des barres en fonction du mode sombre
    const barColor = isDarkMode ? "#000001" : "#ffffff";

// Ajouter les corps statiques avec des barres de couleur conditionnelle
Composite.add(world, [
  Bodies.rectangle(200, 150, 900, 10, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: barColor } }),
  Bodies.rectangle(1000, 350, 900, 10, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: barColor } }),
  Bodies.rectangle(140, 580, 700, 10, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: barColor } }),
  Bodies.rectangle(700, 800, 1000, 10, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: barColor } }) // Nouvelle barre
]);

    // Contrôle de la souris
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Ajuster la vue du rendu à la scène
    Render.lookAt(render, Composite.allBodies(world));

    // Utiliser matter-wrap pour envelopper les corps
    stack.bodies.forEach((body) => {
      body.plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y },
        max: { x: render.bounds.max.x, y: render.bounds.max.y }
      };
    });

    // Fonction de nettoyage
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      render.canvas.remove();
      render.textures = {};
    };
  }, [isDarkMode]); // Dépendance sur isDarkMode pour re-render en cas de changement

  return <div className={style.avalanche} ref={avalancheRef}></div>;
};

export default Avalanche;
