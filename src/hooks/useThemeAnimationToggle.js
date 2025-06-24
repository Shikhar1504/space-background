import { useEffect, useState } from "react";

/**
 * Hook to sync animation disabling with theme mode stored in localStorage.
 * Returns a boolean: `true` if animation should be disabled (`dark-static`), else `false`.
 */
export const useThemeAnimationToggle = () => {
  const [disableAnimation, setDisableAnimation] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDisableAnimation(storedTheme === "dark-static");

    const handleThemeChange = (e) => {
      setDisableAnimation(e.detail === "dark-static");
    };

    document.addEventListener("theme-mode-change", handleThemeChange);
    return () => {
      document.removeEventListener("theme-mode-change", handleThemeChange);
    };
  }, []);

  return disableAnimation;
};
