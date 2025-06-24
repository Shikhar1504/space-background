import { Moon, Star, Sun } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const ThemeToggle = ({
  mobilePosition = "fixed",
  desktopPosition = "fixed",
}) => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "dark-static") {
      document.documentElement.classList.add("dark");
      setThemeMode(storedTheme);
    } else {
      document.documentElement.classList.remove("dark");
      setThemeMode("light");
    }
  }, []);

  const toggleTheme = () => {
    let nextTheme;
    if (themeMode === "light") {
      nextTheme = "dark";
    } else if (themeMode === "dark") {
      nextTheme = "dark-static";
    } else {
      nextTheme = "light";
    }

    setThemeMode(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    document.dispatchEvent(
      new CustomEvent("theme-mode-change", { detail: nextTheme })
    );
  };

  const classes = [
    "theme-toggle-btn",
    mobilePosition === "absolute"
      ? "position-absolute-mobile"
      : "position-fixed-mobile",
    desktopPosition === "absolute"
      ? "position-absolute-desktop"
      : "position-fixed-desktop",
  ].join(" ");

  return (
    <button onClick={toggleTheme} className={classes}>
      {themeMode === "light" && <Moon className="icon light" />}
      {themeMode === "dark" && <Sun className="icon dark" />}
      {themeMode === "dark-static" && <Star className="icon static" />}
    </button>
  );
};

ThemeToggle.propTypes = {
  mobilePosition: PropTypes.oneOf(["fixed", "absolute"]),
  desktopPosition: PropTypes.oneOf(["fixed", "absolute"]),
};
