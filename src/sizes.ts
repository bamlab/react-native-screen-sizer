import type { ScreenDescription } from "./types";

// A resource for keyboard heights: https://federicabenacquista.medium.com/list-of-the-official-ios-keyboards-heights-and-how-to-calculate-them-c2b844ef54b9

export const deviceSizes = {
  "iPhone SE 2016": {
    name: "iPhone SE 2016",
    width: 320,
    height: 568,
    insets: { top: 20, bottom: 0 },
    keyboardHeightMin: 216,
  },
  "iPhone SE 2022": {
    name: "iPhone SE 2022",
    width: 375,
    height: 667,
    insets: { top: 20, bottom: 0 },
    keyboardHeightMin: 216,
  },
  "Galaxy S8": {
    name: "Galaxy S8",
    width: 360,
    height: 740,
    insets: { top: 24, bottom: 0 },
  },
  "iPhone 12 Mini": {
    name: "iPhone 12 Mini",
    width: 375,
    height: 812,
    insets: { top: 44, bottom: 34 },
    keyboardHeightMin: 291,
  },
  "iPhone 12 Pro": {
    name: "iPhone 12 Pro",
    width: 390,
    height: 844,
    insets: { top: 47, bottom: 34 },
    keyboardHeightMin: 291,
  },
} satisfies Record<string, ScreenDescription>;
