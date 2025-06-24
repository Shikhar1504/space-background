import merge from "lodash.merge";
import { useEffect, useState } from "react";
import { SpaceBackground } from "./SpaceBackground";
import SpaceBackgroundDevTool from "./SpaceBackgroundDevTool";

const defaultConfig = {
  stars: {
    count: 150,
    twinkleDecrease: 800,
    minRadius: 0.5,
    maxRadius: 2.0,
  },
  clusters: {
    count: 3,
    starCount: 25,
    color: "rgba(255, 255, 255, 1)",
    radius: 60,
    size: 1.5,
  },
  planets: {
    size: 1.6,
    glow: 4,
    orbitSpeed: 0.001,
    orbitRadiusRange: [4, 7],
    density: 0.92,
  },
  meteors: {
    enable: true,
    interval: 4000,
    length: 80,
    glow: 8,
    colors: ["#ffffff", "rgba(173,216,230, 0.6)", "rgba(255,255,255,0)"],
    speed: 1,
    trailWidth: 2.5,
    angle: 135,
    opacity: 2,
  },
  visual: {
    disableAnimation: false,
    hueOptions: [
      "rgba(220, 200, 255, 0.04)",
      "rgba(255, 220, 200, 0.05)",
      "rgba(200, 255, 240, 0.04)",
      "rgba(255, 255, 200, 0.04)",
      "rgba(200, 230, 255, 0.04)",
    ],
    parallaxFactor: 20,
    parallaxSmoothing: 0.05,
    showHueControl: true,
    mobilePosition: "fixed",
    desktopPosition: "fixed",
  },
};

export default function Space(props) {
  const config = merge({}, defaultConfig, props);

  const [starCount, setStarCount] = useState(config.stars.count);
  const [twinkleSpeed, setTwinkleSpeed] = useState(
    config.stars.twinkleDecrease
  );
  const [clusterCount, setClusterCount] = useState(config.clusters.count);
  const [meteorAngle, setMeteorAngle] = useState(config.meteors.angle);
  const [disableAnimation, setDisableAnimation] = useState(
    config.visual.disableAnimation
  );

  useEffect(() => {
    setDisableAnimation(config.visual.disableAnimation);
  }, [config.visual.disableAnimation]);

  const [showDevTool, setShowDevTool] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
        setShowDevTool((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SpaceBackground
        stars={{
          ...config.stars,
          count: starCount,
          twinkleDecrease: twinkleSpeed,
        }}
        clusters={{
          ...config.clusters,
          count: clusterCount,
        }}
        planets={{
          ...config.planets,
        }}
        meteors={{
          ...config.meteors,
          angle: meteorAngle,
        }}
        visual={{
          ...config.visual,
          disableAnimation,
        }}
      />

      {showDevTool && (
        <SpaceBackgroundDevTool
          twinkleSpeed={twinkleSpeed}
          setTwinkleSpeed={setTwinkleSpeed}
          starCount={starCount}
          setStarCount={setStarCount}
          clusterCount={clusterCount}
          setClusterCount={setClusterCount}
          meteorAngle={meteorAngle}
          setMeteorAngle={setMeteorAngle}
          disableAnimation={disableAnimation}
          setDisableAnimation={setDisableAnimation}
        />
      )}
    </>
  );
}
