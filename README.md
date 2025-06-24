# 🌌 space-background

🚀 A lightweight, stunning, and animated space-themed React background with stars, planets, and meteors. Perfect for modern UIs, portfolios, and landing pages.

[![npm version](https://img.shields.io/npm/v/space-background?style=flat-square)](https://www.npmjs.com/package/space-background)
[![downloads](https://img.shields.io/npm/dm/space-background?style=flat-square)](https://www.npmjs.com/package/space-background)
![React 18+](https://img.shields.io/badge/React-18+-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-required-38bdf8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-7%2B-ff69b4?style=flat-square&logo=framer)
![Vite](https://img.shields.io/badge/Vite-supported-646cff?style=flat-square&logo=vite)

A beautiful, animated space-themed background component for React with configurable stars, planets, meteors, parallax motion, and theme toggling between `light`, `dark`, and `dark-static`.

> 🌠 Perfect for modern, aesthetic portfolios, landing pages, or immersive UIs.

## 📚 Table of Contents

- [✨ Features](#-features)
- [🎥 Preview](#-preview)
- [📦 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [🌗 Theme Modes](#-theme-modes)
- [🧩 Components](#-components)
- [🧾 Props Reference](#-props-reference)
- [🛠 Requirements](#-requirements)
- [🧭 Use Cases](#-use-cases)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [🧑‍💻 Local Dev Setup](#-local-dev-setup)
- [🌍 Used In](#-used-in)

---

<a name="features"></a>

## ✨ Features

- ⚙️ Fully customizable starfields, meteors, and planet orbits
- 🌗 Built-in theme toggle: light / dark / dark-static
- 🎨 Framer Motion animation with parallax support
- ⚡ Lightweight and tree-shakable
- 🧠 TypeScript types included
- 📦 Works with React 18+ and Vite
- `<SpaceBackground />` is a lightweight drop-in animated canvas.
- `<Space />` is a developer-focused scene component with live control panels, ideal for prototyping or fine-tuning visual settings.

---

## 🎥 Preview

#### 🌌 Animated Demo

<p align="center">
  <img src="https://github.com/Shikhar1504/space-background/blob/main/assets/Animation.gif" width="100%" alt="space-background demo" />
</p>

> 👆 A glimpse of stars, planets, meteors, and theme/hue toggling in motion.

#### 🖼 Static Screenshots

<p align="center">
  <img src="https://github.com/Shikhar1504/space-background/blob/main/assets/1.png?raw=true" width="30%" alt="Animation" />
  &nbsp;
  <img src="https://github.com/Shikhar1504/space-background/blob/main/assets/2.png?raw=true" width="30%" alt="No Animation" />
  &nbsp;
  <img src="https://github.com/Shikhar1504/space-background/blob/main/assets/3.png?raw=true" width="30%" alt="Animation with Hue and Theme Toggle buttons" />
</p>

> ✅ Static views showing different modes and control panels.

---

## 📦 Installation

```bash
npm install space-background
# or
yarn add space-background
# or
pnpm add space-background
```

> 💡 Don’t forget to import "space-background/style.css" in your main.jsx and ensure Tailwind CSS is installed for styles to work properly.

---

## 🚀 Quick Start

- In App.jsx (JavaScript)

```jsx
import SpaceBackground, {
  ThemeToggle,
  useThemeAnimationToggle,
} from "space-background";

function App() {
  const disableAnimation = useThemeAnimationToggle();

  return (
    <>
      <ThemeToggle />
      <SpaceBackground visual={{ disableAnimation: disableAnimation }} />
    </>
  );
}

export default App;
```

- In App.tsx (TypeScript)

```tsx
import SpaceBackground, {
  ThemeToggle,
  useThemeAnimationToggle,
} from "space-background";

function App() {
  const disableAnimation = useThemeAnimationToggle();
  return (
    <>
      <ThemeToggle />
      <SpaceBackground visual={{ disableAnimation: disableAnimation }} />
    </>
  );
}

export default App;
```

> ✅ TypeScript support is built-in. All props are typed, including stars, planets, meteors, and visual.

- Import Styles in main.jsx / main.tsx

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "space-background/style.css"; // Add this line in main.jsx

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "space-background/style.css"; // Add this line in main.tsx
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

> 💡 This CSS import is essential for background and animation styles. Ensure Tailwind is working correctly.

- 💡 Tailwind CSS must be installed for styles to work correctly.

---

## 🌗 Theme Modes

| Mode          | Animation | Class Applied | Icon |
| ------------- | --------- | ------------- | ---- |
| `light`       | ❌        | _none_        | 🌙   |
| `dark`        | ✅        | `dark`        | ☀️   |
| `dark-static` | ❌        | `dark`        | ⭐   |

🔁 ThemeToggle cycles modes: light → dark → dark-static → light

💾 Persists user preference using localStorage

📣 Dispatches a theme-mode-change event with the current mode in event.detail

---

## 🧩 Components

- **`SpaceBackground`**

  The main animated space-themed background component.  
   Highly customizable with props for stars, clusters, planets, meteors, and visual settings.

  **Minimal usage:**

  ```jsx
  <SpaceBackground />
  ```

  **Full props example:**

  ```jsx
  <SpaceBackground
    stars={{ count: 150, ... }}
    clusters={{ count: 3, ... }}
    planets={{ size: 1.6, ... }}
    meteors={{ enable: true, ... }}
    visual={{ disableAnimation: false, ... }}
  />
  ```

  - You can hide the hue control panel by setting `visual={{ showHueControl: false }}`.

  ```jsx
  <SpaceBackground
    visual={{
      showHueControl: false, // hides hue picker
    }}
  />
  ```

- **`Space`**

  An advanced animated space scene component with developer controls — ideal for demos, testing, and interactive UIs.

  Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> to toggle the live dev control panel.

  Has the same props as SpaceBackground, plus an interactive editing UI.

  **Minimal usage:**

  ```jsx
  <Space />
  ```

  **Full props example:**

  ```jsx
  <Space
    stars={{ count: 150, ... }}
    clusters={{ count: 3, ... }}
    planets={{ size: 1.6, ... }}
    meteors={{ enable: true, ... }}
    visual={{ disableAnimation: false, ... }}
  />
  ```

  - You can hide the hue control panel by setting `visual={{ showHueControl: false }}`.

  ```jsx
  <Space
    visual={{
      showHueControl: false, // hides hue picker
    }}
  />
  ```

- **`ThemeToggle`**

  A minimal, responsive button that toggles the theme between `light`, `dark`, and `dark-static`.

  #### ✅ Features:

  - Cycles through all three modes: `light → dark → dark-static`
  - Automatically applies `dark` class to `<html>`
  - Persists user preference using `localStorage`
  - Dispatches `theme-mode-change` event with current mode (`event.detail`)
  - Accepts layout props for mobile and desktop positioning

  **Minimal usage:**

  ```jsx
  <ThemeToggle />
  ```

  #### 🔧 Props

  | Prop              | Type                      | Default | Description                           |
  | ----------------- | ------------------------- | ------- | ------------------------------------- |
  | `mobilePosition`  | `"fixed"` \| `"absolute"` | `fixed` | CSS `position` for mobile screens.    |
  | `desktopPosition` | `"fixed"` \| `"absolute"` | `fixed` | CSS `position` for desktop viewports. |

  **Example usage:**

  ```jsx
  <ThemeToggle mobilePosition="fixed" desktopPosition="fixed" />
  ```

- **`useThemeAnimationToggle`**

  A React hook that returns `true` when the current theme is set to `"dark-static"`.
  Useful for conditionally disabling animations when the static theme is active.

  **Example usage:**

  ```js
  const disableAnimation = useThemeAnimationToggle();
  ```

---

## 🧾 Props Reference

#### `stars`

| Prop              | Type   | Default | Description               |
| ----------------- | ------ | ------- | ------------------------- |
| `count`           | number | 150     | Number of stars           |
| `twinkleDecrease` | number | 800     | How quickly stars twinkle |
| `minRadius`       | number | 0.5     | Minimum radius of a star  |
| `maxRadius`       | number | 2.0     | Maximum radius of a star  |

#### `clusters`

| Prop        | Type   | Default               | Description                        |
| ----------- | ------ | --------------------- | ---------------------------------- |
| `count`     | number | 3                     | Number of star clusters            |
| `starCount` | number | 25                    | Stars per cluster                  |
| `color`     | string | `rgba(255,255,255,1)` | Color of cluster stars             |
| `radius`    | number | 60                    | Radius of each cluster             |
| `size`      | number | 1.5                   | Scale multiplier for cluster stars |

#### `planets`

| Prop               | Type               | Default | Description                        |
| ------------------ | ------------------ | ------- | ---------------------------------- |
| `size`             | number             | 1.6     | Planet size multiplier             |
| `glow`             | number             | 4       | Glow intensity                     |
| `orbitSpeed`       | number             | 0.001   | Speed of planetary orbit           |
| `orbitRadiusRange` | `[number, number]` | [4, 7]  | Min and max orbit radius           |
| `density`          | number             | 0.92    | Number of planets based on density |

#### `meteors`

| Prop         | Type     | Default     | Description                     |
| ------------ | -------- | ----------- | ------------------------------- |
| `enable`     | boolean  | true        | Whether meteors are shown       |
| `interval`   | number   | 4000        | Time between meteor spawns (ms) |
| `length`     | number   | 80          | Meteor length                   |
| `glow`       | number   | 8           | Glow intensity                  |
| `colors`     | string[] | See below ▼ | Meteor trail colors             |
| `speed`      | number   | 1           | Speed of meteors                |
| `trailWidth` | number   | 2.5         | Width of the meteor trail       |
| `angle`      | number   | 135         | Meteor angle in degrees         |
| `opacity`    | number   | 2           | Meteor opacity                  |

<details> <summary><strong>Default value for <code>meteors.colors</code></strong></summary>

```js
["#ffffff", "rgba(173,216,230, 0.6)", "rgba(255,255,255,0)"];
```

</details>

#### `visual`

| Prop                | Type     | Default     | Description                                                            |
| ------------------- | -------- | ----------- | ---------------------------------------------------------------------- |
| `disableAnimation`  | boolean  | false       | Disables animation (used for `dark-static`)                            |
| `hueOptions`        | string[] | See below ▼ | Background hue overlays                                                |
| `parallaxFactor`    | number   | 20          | Strength of parallax motion                                            |
| `parallaxSmoothing` | number   | 0.05        | Smoothing factor for parallax movement                                 |
| `showHueControl`    | boolean  | `true`      | `Toggle to show/hide the hue color overlay control panel`              |
| `mobilePosition`    | string   | `fixed`     | CSS position mode on mobile (fixed or absolute) of hue Control button  |
| `desktopPosition`   | string   | `fixed`     | CSS position mode on desktop (fixed or absolute) of hue control button |

<details>
  <summary><strong>Default value for <code>hueOptions</code></strong></summary>

```js
[
  "rgba(220, 200, 255, 0.04)",
  "rgba(255, 220, 200, 0.05)",
  "rgba(200, 255, 240, 0.04)",
  "rgba(255, 255, 200, 0.04)",
  "rgba(200, 230, 255, 0.04)",
];
```

</details>

---

## 🛠 Requirements

- React 18+

- Framer Motion 7+

- Tailwind CSS

- Compatible with any modern React setup (Vite, Next.js, CRA, etc.). Vite is used for development.

- TypeScript supported (but optional)

---

## 🧭 Use Cases

- Personal portfolios and developer resumes
- Hero sections of landing pages
- Conference or hackathon websites
- Splash screens for games or apps
- Backgrounds for data visualizations or dashboards

---

## 📄 License

MIT © Shikhar Sinha

---

## 🤝 Contributing

Contributions, PRs, and feedback are welcome!

Whether it's fixing bugs, adding features, or improving documentation — all help is appreciated.
Please open an issue to discuss ideas before large changes.

---

## 🧑‍💻 Local Dev Setup

To develop locally:

1. Clone the repo:

   ```bash
   git clone https://github.com/Shikhar1504/space-background.git
   cd space-background
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the package:

   ```bash
   npm run build
   ```

4. Test in a demo project:

   - Create a new Vite app (e.g. vite-demo)

   - Use npm link to link space-background

   - Import and render <SpaceBackground /> in your demo app

---

## 🌌 Made with ✨ + 🧠

Enjoy building with cosmic vibes!

---

## 🌍 Used In

| Project Name | Link                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| My Portfolio | [shikhar.dev](https://shikhar.dev)                                          |
| Your Site?   | [Submit via PR](https://github.com/Shikhar1504/space-background/issues/new) |

> Want to be featured here? Open a PR or [create an issue](https://github.com/Shikhar1504/space-background/issues/new) with your link!

---

<p align="center">
  Made with 🪐 stars, ☄️ meteors, and 💫 imagination by <a href="https://github.com/Shikhar1504">@Shikhar1504</a>
</p>
````
