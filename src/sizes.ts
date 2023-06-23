import type { ScreenDescription } from './types';

// A resource for keyboard heights: https://federicabenacquista.medium.com/list-of-the-official-ios-keyboards-heights-and-how-to-calculate-them-c2b844ef54b9

export const defaultScreenDescriptions: Array<ScreenDescription> = [
  {
    name: 'iPhone SE 2016',
    width: 320,
    height: 568,
    insets: { top: 20, bottom: 0 },
    keyboardHeightMin: 216,
  },
  {
    name: 'iPhone SE 2022',
    width: 375,
    height: 667,
    insets: { top: 20, bottom: 0 },
    keyboardHeightMin: 216,
  },
  {
    name: 'Galaxy S8',
    width: 360,
    height: 740,
    insets: { top: 24, bottom: 0 },
  },
  {
    name: 'iPhone 12 Mini',
    width: 375,
    height: 812,
    insets: { top: 44, bottom: 34 },
    keyboardHeightMin: 291,
  },
  {
    name: 'iPhone 12 Pro',
    width: 390,
    height: 844,
    insets: { top: 47, bottom: 34 },
    keyboardHeightMin: 291,
  },
];

export const defaultDevices = defaultScreenDescriptions.reduce<
  Record<string, ScreenDescription>
>((acc, device) => Object.assign(acc, { [device.name]: device }), {});
