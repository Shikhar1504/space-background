import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import debounce from "lodash.debounce";
import { Palette } from "lucide-react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

export const SpaceBackground = ({
  stars = {},
  clusters = {},
  planets = {},
  meteors = {},
  visual = {},
}) => {
  const {
    count: starCount = 150,
    twinkleDecrease: twinkleSpeed = 800,
    minRadius = 0.5,
    maxRadius = 2.0,
  } = stars;

  const {
    count: clusterCount = 3,
    starCount: clusterStarCount = 25,
    color: starColor = "rgba(255, 255, 255, 1)",
    radius: clusterRadius = 60,
    size: clusterStarSize = 1.5,
  } = clusters;

  const {
    size: planetSize = 1.6,
    glow: planetGlow = 4,
    orbitSpeed: planetOrbitSpeed = 0.001,
    orbitRadiusRange = [4, 7],
    density = 0.92,
  } = planets;

  const {
    enable: enableMeteors = true,
    interval: meteorInterval = 4000,
    length: meteorLength = 80,
    glow: meteorGlow = 8,
    colors: meteorColors = [
      "#ffffff",
      "rgba(173,216,230, 0.6)",
      "rgba(255,255,255,0)",
    ],
    speed: meteorSpeed = 1,
    trailWidth: meteorTrailWidth = 2.5,
    angle: meteorAngle = 135,
    opacity = 2,
  } = meteors;

  const {
    disableAnimation = false,
    hueOptions = [
      "rgba(220, 200, 255, 0.04)",
      "rgba(255, 220, 200, 0.05)",
      "rgba(200, 255, 240, 0.04)",
      "rgba(255, 255, 200, 0.04)",
      "rgba(200, 230, 255, 0.04)",
    ],
    parallaxFactor = 20,
    parallaxSmoothing = 0.05,
    showHueControl = true,
    mobilePosition = "fixed",
    desktopPosition = "fixed",
  } = visual;

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const parallaxOffset = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });

  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    lastFrameTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("dark")) {
      root.classList.add("dark");
    }
    return () => {};
  }, []);

  const [hueColor, setHueColor] = useState(() => {
    if (!hueOptions || hueOptions.length === 0) return "transparent";
    return hueOptions[0];
  });

  const hueIndex = hueOptions.indexOf(hueColor);
  const hueMotion = useMotionValue(hueIndex);
  const hueSpring = useSpring(hueMotion, { stiffness: 60, damping: 20 });

  const interpolatedHue = useTransform(hueSpring, (index) => {
    const i = Math.round(index);
    const clamped = Math.max(0, Math.min(hueOptions.length - 1, i));
    return hueOptions[clamped];
  });

  useEffect(() => {
    hueMotion.set(hueOptions.indexOf(hueColor));
  }, [hueColor, hueMotion]);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const hueRef = useRef(hueColor);
  const starsRef = useRef([]);
  const clustersRef = useRef([]);

  useEffect(() => {
    hueRef.current = hueColor;
  }, [hueColor]);

  const cycleHue = useCallback(() => {
    if (!hueOptions?.length) return;

    setHueColor((current) => {
      const index = hueOptions.indexOf(current);
      return hueOptions[(index + 1) % hueOptions.length];
    });
  }, [hueOptions]);

  const resizeCanvas = (canvas) => {
    if (typeof window === "undefined") return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const generateStars = useCallback(
    (width, height) =>
      Array.from({ length: starCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        twinkle: Math.random() * Math.PI * 2,
      })),
    [starCount]
  );

  const generateClusters = useCallback(
    (width, height) =>
      Array.from({ length: clusterCount }).map(() => ({
        cx: Math.random() * width,
        cy: Math.random() * height,
        stars: Array.from({ length: clusterStarCount }).map(() => ({
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * clusterRadius + 20,
          size: Math.random() * clusterStarSize + 0.5,
          hasPlanet: Math.random() > density,
          orbitRadius:
            Math.random() * (orbitRadiusRange[1] - orbitRadiusRange[0]) +
            orbitRadiusRange[0],
          planetColor: `hsl(${Math.floor(Math.random() * 360)}, 50%, 70%)`,
          orbitAngle: Math.random() * Math.PI * 2,
        })),
        speed: 0.001 + Math.random() * 0.002,
        baseAngle: Math.random() * Math.PI * 2,
        ey: Math.random() * 2 + 4,
      })),
    [clusterCount, clusterStarCount]
  );

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const shouldAnimate = !disableAnimation && !prefersReducedMotion;

  const renderStaticStars = useCallback(
    (ctx, stars, offsetX = 0, offsetY = 0, time = 0) => {
      for (const star of stars) {
        const opacity = disableAnimation
          ? 1
          : 0.5 + 0.5 * Math.sin(time + star.twinkle);
        ctx.beginPath();
        ctx.arc(
          star.x + offsetX * 0.2,
          star.y + offsetY * 0.2,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    },
    [twinkleSpeed, disableAnimation]
  );

  const rgba = (color, alpha) => {
    const match = color.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d*\.?\d+)?\)/
    );
    if (!match) return color;
    const [, r, g, b] = match;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const clearAndTintBackground = (ctx, width, height, hue, isDark) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = hue;
    ctx.globalCompositeOperation = "lighter";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
  };

  const createMeteor = useCallback(
    (meteors, width, height) => {
      const angleRad = (meteorAngle * Math.PI) / 180;
      const baseSpeed = 2 + Math.random();
      meteors.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.3,
        vx: Math.cos(angleRad) * baseSpeed * meteorSpeed,
        vy: Math.sin(angleRad) * baseSpeed * meteorSpeed,
        length: meteorLength,
        opacity,
      });
    },
    [meteorAngle, meteorSpeed, meteorLength, opacity]
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    });
    const ctx = ctxRef.current;
    if (!ctx) return;

    resizeCanvas(canvas);
    let width = canvas.width;
    let height = canvas.height;

    starsRef.current = generateStars(width, height);
    clustersRef.current = generateClusters(width, height);

    const stars = starsRef.current;
    const clusters = clustersRef.current;
    const meteors = [];
    let lastMeteorTime = 0;
    let animationFrameId = null;

    const stop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    createMeteor(meteors, width, height);

    const draw = (timestamp) => {
      parallaxOffset.current.x +=
        (targetOffset.current.x - parallaxOffset.current.x) * parallaxSmoothing;
      parallaxOffset.current.y +=
        (targetOffset.current.y - parallaxOffset.current.y) * parallaxSmoothing;

      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      const offsetX = parallaxOffset.current.x;
      const offsetY = parallaxOffset.current.y;
      const currentDark = document.documentElement.classList.contains("dark");

      clearAndTintBackground(
        ctx,
        width,
        height,
        interpolatedHue.get(),
        currentDark
      );

      const time = timestamp / twinkleSpeed;
      renderStaticStars(ctx, stars, offsetX, offsetY, time);

      if (!disableAnimation) {
        clusters.forEach((cluster) => {
          cluster.baseAngle += cluster.speed;

          cluster.stars.forEach((s) => {
            const angle = cluster.baseAngle + s.angle;

            const x = cluster.cx + Math.cos(angle) * s.radius;
            const y = cluster.cy + Math.sin(angle) * s.radius;

            ctx.beginPath();
            ctx.arc(
              x + offsetX * 0.4,
              y + offsetY * 0.4,
              s.size,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = starColor;
            ctx.fill();

            if (s.hasPlanet && currentDark) {
              s.orbitAngle = (s.orbitAngle ?? 0) + deltaTime * planetOrbitSpeed;

              const px = x + Math.cos(s.orbitAngle) * s.orbitRadius;

              const py = y + Math.sin(s.orbitAngle) * (s.ey ?? 6);

              ctx.save();
              ctx.shadowColor = s.planetColor;
              ctx.shadowBlur = planetGlow;
              ctx.fillStyle = s.planetColor;
              ctx.beginPath();
              ctx.arc(
                px + offsetX * 0.4,
                py + offsetY * 0.4,
                planetSize,
                0,
                Math.PI * 2
              );
              ctx.fill();
              ctx.restore();
            }
          });
        });

        const now = timestamp;

        if (
          enableMeteors &&
          currentDark &&
          now - lastMeteorTime > meteorInterval + Math.random() * 3000
        ) {
          createMeteor(meteors, width, height);
          lastMeteorTime = now;
        }

        if (enableMeteors) {
          for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            const tailX = m.x + m.vx * m.length;
            const tailY = m.y + m.vy * m.length;

            ctx.save();
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);

            meteorColors.forEach((color, i) =>
              gradient.addColorStop(
                i / (meteorColors.length - 1),
                rgba(color, m.opacity)
              )
            );
            ctx.shadowColor = "white";
            ctx.shadowBlur = meteorGlow;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = meteorTrailWidth;

            ctx.moveTo(m.x, m.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
            ctx.restore();

            m.x += m.vx;
            m.y += m.vy;
            if (m.x > width + m.length || m.y > height + m.length) {
              meteors.splice(i, 1);
            }

            if (meteors.length > 50) meteors.splice(0, meteors.length - 50);

            const FADE_RATE = 0.006 / 16.67;
            m.opacity -= FADE_RATE * deltaTime;

            if (m.opacity <= 0) meteors.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    if (shouldAnimate) {
      stop();
      animationFrameId = requestAnimationFrame(draw);
    } else {
      meteors.length = 0;
      clearAndTintBackground(ctx, width, height, hueRef.current, isDark);
      renderStaticStars(ctx, stars);
    }

    const onResize = () => {
      resizeCanvas(canvas);
      width = canvas.width;
      height = canvas.height;
      starsRef.current = generateStars(width, height);
      clustersRef.current = generateClusters(width, height);
    };

    let pointerRAF = null;

    const onPointerMove = (x, y) => {
      if (pointerRAF) return;
      pointerRAF = requestAnimationFrame(() => {
        pointerRAF = null;
        targetOffset.current = {
          x: (x / window.innerWidth - 0.5) * 2 * parallaxFactor,
          y: (y / window.innerHeight - 0.5) * 2 * parallaxFactor,
        };
      });
    };

    const onMouseMove = (e) => onPointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) =>
      e.touches.length > 0 &&
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    const debouncedResize = debounce(onResize, 150);
    window.addEventListener("resize", debouncedResize);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      }
      starsRef.current = [];
      clustersRef.current = [];
      meteors.length = 0;
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      stop();
    };
  }, [
    disableAnimation,
    generateStars,
    generateClusters,
    createMeteor,
    renderStaticStars,
  ]);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") checkDark();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("theme-mode-change", checkDark);
    return () => {
      observer.disconnect();
      window.removeEventListener("theme-mode-change", checkDark);
    };
  }, []);

  const classes = [
    "hue-toggle-btn",
    mobilePosition === "absolute"
      ? "position-absolute-mobile"
      : "position-fixed-mobile",
    desktopPosition === "absolute"
      ? "position-absolute-desktop"
      : "position-fixed-desktop",
  ].join(" ");

  return (
    <>
      <AnimatePresence>
        <motion.canvas
          key="space-bg"
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="space-bg-canvas"
          aria-hidden="true"
          role="presentation"
        />
      </AnimatePresence>
      {!disableAnimation &&
        isDark &&
        hueOptions &&
        showHueControl &&
        hueOptions?.length > 0 && (
          <motion.button
            onClick={cycleHue}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                cycleHue();
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={classes}
            aria-label="Change Hue"
            tabIndex={0}
          >
            <Palette className="hue-icon" />
            <span className="tooltip">Change Hue</span>
          </motion.button>
        )}
    </>
  );
};

SpaceBackground.propTypes = {
  stars: PropTypes.shape({
    count: PropTypes.number,
    twinkleDecrease: PropTypes.number,
    maxRadius: PropTypes.number,
    minRadius: PropTypes.number,
  }),
  clusters: PropTypes.shape({
    count: PropTypes.number,
    starCount: PropTypes.number,
    color: PropTypes.string,
    radius: PropTypes.number,
    size: PropTypes.number,
  }),
  planets: PropTypes.shape({
    size: PropTypes.number,
    glow: PropTypes.number,
    orbitSpeed: PropTypes.number,
    orbitRadiusRange: PropTypes.arrayOf(PropTypes.number),
    density: PropTypes.number,
  }),
  meteors: PropTypes.shape({
    enable: PropTypes.bool,
    interval: PropTypes.number,
    length: PropTypes.number,
    glow: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    speed: PropTypes.number,
    trailWidth: PropTypes.number,
    angle: PropTypes.number,
    opacity: PropTypes.number,
  }),
  visual: PropTypes.shape({
    disableAnimation: PropTypes.bool,
    hueOptions: PropTypes.arrayOf(PropTypes.string),
    parallaxSmoothing: PropTypes.number,
    parallaxFactor: PropTypes.number,
    showHueControl: PropTypes.bool,
    mobilePosition: PropTypes.oneOf(["fixed", "absolute"]),
    desktopPosition: PropTypes.oneOf(["fixed", "absolute"]),
  }),
};

export default SpaceBackground;
