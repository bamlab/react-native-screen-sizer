// A resource for keyboard heights: https://federicabenacquista.medium.com/list-of-the-official-ios-keyboards-heights-and-how-to-calculate-them-c2b844ef54b9

import { Device } from './types';

const iPhoneSE2016: Device = {
  name: 'iPhone SE 2016',
  width: 320,
  height: 568,
  insets: { top: 20, bottom: 0 },
};

const iPhoneSE2022: Device = {
  name: 'iPhone SE 2022',
  width: 375,
  height: 667,
  insets: { top: 20, bottom: 0 },
};

const galaxyS8: Device = {
  name: 'Galaxy S8',
  width: 360,
  height: 740,
  insets: { top: 24, bottom: 0 },
};

const iPhone12Mini: Device = {
  name: 'iPhone 12 Mini',
  width: 375,
  height: 812,
  insets: { top: 44, bottom: 34 },
};

const iPhone12Pro: Device = {
  name: 'iPhone 12 Pro',
  width: 390,
  height: 844,
  insets: { top: 47, bottom: 34 },
};

export const defaultDevices = {
  iPhoneSE2016,
  iPhoneSE2022,
  iPhone12Mini,
  iPhone12Pro,
  galaxyS8,
  all: [iPhoneSE2016, iPhoneSE2022, galaxyS8, iPhone12Mini, iPhone12Pro],
};
