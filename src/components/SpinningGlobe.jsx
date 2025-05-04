
import React, { useEffect, useState } from "react";
import "./SpinningGlobe.css";

const globeImages = [
  "/globes/globe1.jpg",
  "/globes/globe2.jpg",
  "/globes/globe3.jpg",
  "/globes/globe4.jpg",
];

const SpinningGlobe = ({ onClick }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % globeImages.length);
    }, 2200); // Change frame every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="spinning-globe" onClick={onClick}>
      <img src={globeImages[index]} alt="Spinning globe" />
    </div>
  );
};

export default SpinningGlobe;
