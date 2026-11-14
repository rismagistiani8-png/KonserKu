import { Platform } from 'react-native';

export const COLORS = {
  bg: '#FFF8E7',
  maroon: '#5C1A14',
  text: '#4A2A26',
  blue: '#BFD4EA',
  pink: '#F4C6CF',
  gold: '#C9A227',
  white: '#FFFFFF',
  muted: '#8A6F6A',
};

export const FONT_SERIF = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});
