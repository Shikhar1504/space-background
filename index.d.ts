/**
 * Renders an animated background of space with stars, planets, meteors, and visual effects.
 *
 * @param stars Configuration for individual stars.
 * @param clusters Configuration for star clusters.
 * @param planets Configuration for orbiting planets.
 * @param meteors Configuration for falling meteors.
 * @param visual Visual appearance and animation control.
 */
export function SpaceBackground({
  stars,
  clusters,
  planets,
  meteors,
  visual,
}: {
  stars?: {
    /** Number of stars (default: 150) */
    count?: number;
    /** Speed of twinkle animation (default: 800) */
    twinkleDecrease?: number;
    /** Minimum star radius (default: 0.5) */
    minRadius?: number;
    /** Maximum star radius (default: 2.0) */
    maxRadius?: number;
  };
  clusters?: {
    /** Number of star clusters (default: 3) */
    count?: number;
    /** Stars per cluster (default: 25) */
    starCount?: number;
    /** Star color in cluster (default: "rgba(255, 255, 255, 1)") */
    color?: string;
    /** Radius of each cluster (default: 60) */
    radius?: number;
    /** Size of stars in clusters (default: 1.5) */
    size?: number;
  };
  planets?: {
    /** Size of planets (default: 1.6) */
    size?: number;
    /** Planet glow intensity (default: 4) */
    glow?: number;
    /** Orbiting speed (default: 0.001) */
    orbitSpeed?: number;
    /** Orbit radius range (default: [4, 7]) */
    orbitRadiusRange?: [number, number];
    /** Planet density in orbits (default: 0.92) */
    density?: number;
  };
  meteors?: {
    /** Enable meteor animation (default: true) */
    enable?: boolean;
    /** Interval between meteors in ms (default: 4000) */
    interval?: number;
    /** Trail length (default: 80) */
    length?: number;
    /** Trail glow (default: 8) */
    glow?: number;
    /** Trail colors (default: ["#ffffff", "rgba(173,216,230,0.6)", "rgba(255,255,255,0)"]) */
    colors?: string[];
    /** Meteor speed (default: 1) */
    speed?: number;
    /** Trail width (default: 2.5) */
    trailWidth?: number;
    /** Meteor angle (default: 135) */
    angle?: number;
    /** Meteor opacity (default: 2) */
    opacity?: number;
  };
  visual?: {
    /** Disable all animation (default: false) */
    disableAnimation?: boolean;
    /** Hue overlay options (default: ["rgba(220, 200, 255, 0.04)", "rgba(255, 220, 200, 0.05)", "rgba(200, 255, 240, 0.04)", "rgba(255, 255, 200, 0.04)", "rgba(200, 230, 255, 0.04)",]) */
    hueOptions?: string[];
    /** Cursor parallax factor (default: 20) */
    parallaxFactor?: number;
    /** Smoothing for parallax (default: 0.05) */
    parallaxSmoothing?: number;
    /** Show hue control panel (default: true) */
    showHueControl?: boolean;
    /** Position on small screens (default: "fixed") */
    mobilePosition?: "fixed" | "absolute";
    /** Position on large screens (default: "fixed") */
    desktopPosition?: "fixed" | "absolute";
  };
}): JSX.Element;

export namespace SpaceBackground {
  namespace propTypes {
    let stars: any;
    let clusters: any;
    let planets: any;
    let meteors: any;
    let visual: any;
  }
}

/**
 * Renders the interactive space scene with optional developer controls.
 *
 * Allows runtime prop manipulation through keyboard (`Ctrl+Shift+H`) for toggling developer tools.
 *
 * @param stars Configuration for individual stars.
 * @param clusters Configuration for star clusters.
 * @param planets Configuration for orbiting planets.
 * @param meteors Configuration for falling meteors.
 * @param visual Visual appearance and animation control.
 */
export function Space({
  stars,
  clusters,
  planets,
  meteors,
  visual,
}: {
  stars?: {
    /** Number of stars (default: 150) */
    count?: number;
    /** Speed of twinkle animation (default: 800) */
    twinkleDecrease?: number;
    /** Minimum star radius (default: 0.5) */
    minRadius?: number;
    /** Maximum star radius (default: 2.0) */
    maxRadius?: number;
  };
  clusters?: {
    /** Number of star clusters (default: 3) */
    count?: number;
    /** Stars per cluster (default: 25) */
    starCount?: number;
    /** Star color in cluster (default: "rgba(255, 255, 255, 1)") */
    color?: string;
    /** Radius of each cluster (default: 60) */
    radius?: number;
    /** Size of stars in clusters (default: 1.5) */
    size?: number;
  };
  planets?: {
    /** Size of planets (default: 1.6) */
    size?: number;
    /** Planet glow intensity (default: 4) */
    glow?: number;
    /** Orbiting speed (default: 0.001) */
    orbitSpeed?: number;
    /** Orbit radius range (default: [4, 7]) */
    orbitRadiusRange?: [number, number];
    /** Planet density in orbits (default: 0.92) */
    density?: number;
  };
  meteors?: {
    /** Enable meteor animation (default: true) */
    enable?: boolean;
    /** Interval between meteors in ms (default: 4000) */
    interval?: number;
    /** Trail length (default: 80) */
    length?: number;
    /** Trail glow (default: 8) */
    glow?: number;
    /** Trail colors (default: ["#ffffff", "rgba(173,216,230,0.6)", "rgba(255,255,255,0)"]) */
    colors?: string[];
    /** Meteor speed (default: 1) */
    speed?: number;
    /** Trail width (default: 2.5) */
    trailWidth?: number;
    /** Meteor angle (default: 135) */
    angle?: number;
    /** Meteor opacity (default: 2) */
    opacity?: number;
  };
  visual?: {
    /** Disable all animation (default: false) */
    disableAnimation?: boolean;
    /** Hue overlay options (default: ["rgba(220, 200, 255, 0.04)", "rgba(255, 220, 200, 0.05)", "rgba(200, 255, 240, 0.04)", "rgba(255, 255, 200, 0.04)", "rgba(200, 230, 255, 0.04)",]) */
    hueOptions?: string[];
    /** Cursor parallax factor (default: 20) */
    parallaxFactor?: number;
    /** Smoothing for parallax (default: 0.05) */
    parallaxSmoothing?: number;
    /** Show hue control panel (default: true) */
    showHueControl?: boolean;
    /** Position on small screens (default: "fixed") */
    mobilePosition?: "fixed" | "absolute";
    /** Position on large screens (default: "fixed") */
    desktopPosition?: "fixed" | "absolute";
  };
}): JSX.Element;

export namespace Space {
  namespace propTypes {
    let stars: any;
    let clusters: any;
    let planets: any;
    let meteors: any;
    let visual: any;
  }
}

/**
 * Toggles the website's theme between three modes:
 * - `"light"`: Light theme, no dark styles applied.
 * - `"dark"`: Dark theme with animation effects.
 * - `"dark-static"`: Dark theme with animation effects disabled.
 *
 * ### Features:
 * - Automatically reads the initial theme from `localStorage`.
 * - Updates the DOM by adding or removing the `dark` class on `<html>`.
 * - Persists the user's choice in `localStorage`.
 * - Cycles through themes in the order: `light → dark → dark-static → light`.
 * - Dispatches a `CustomEvent("theme-mode-change")` with the current theme as `detail`,
 *   allowing other components (like `SpaceBackground`) to respond.
 *
 * ### Icons:
 * - 🌙 `Moon` for light mode
 * - ☀️ `Sun` for dark mode
 * - ⭐ `Star` for dark-static mode
 *
 * ### Props:
 * @param mobilePosition `"fixed"` or `"absolute"` - Determines position on small screens (default: `"fixed"`).
 * @param desktopPosition `"fixed"` or `"absolute"` - Determines position on large screens (default: `"fixed"`).
 *
 * @returns JSX Element – A themed toggle button with cycling visual modes.
 */
export function ThemeToggle({
  mobilePosition,
  desktopPosition,
}: {
  mobilePosition?: "fixed" | "absolute";
  desktopPosition?: "fixed" | "absolute";
}): JSX.Element;

/**
 * Hook to toggle animation effects based on the current theme mode.
 *
 * Works in conjunction with the `ThemeToggle` component.
 * This hook checks if the user's theme is set to `"dark-static"` via `localStorage`
 * and returns a boolean indicating whether animations should be disabled.
 *
 * ### Behavior:
 * - On initial mount, it reads the theme from `localStorage`.
 * - Listens for `theme-mode-change` events dispatched by `ThemeToggle`.
 * - Automatically updates the returned value (`true` or `false`) when the theme changes.
 *
 * ### Returns:
 * - `true` if theme mode is `"dark-static"` (animations should be disabled).
 * - `false` for all other modes (`light`, `dark`).
 *
 * @returns `boolean` indicating whether animation should be disabled.
 */
export function useThemeAnimationToggle(): boolean;

/**
 * Static default export of `SpaceBackground`
 */
export default SpaceBackground;
