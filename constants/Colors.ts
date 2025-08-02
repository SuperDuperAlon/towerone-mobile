/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  // Primary colors
  primary: '#0a7ea4',
  primaryLight: '#0d9bc7',
  primaryDark: '#085a7a',
  
  // Text colors
  textPrimary: '#11181C',
  textSecondary: '#495057',
  textMuted: '#6c757d',
  textLight: '#999',
  
  // Background colors
  background: '#fff',
  backgroundSecondary: '#f8f9fa',
  backgroundTertiary: '#e9ecef',
  card: '#fff',
  
  // Border colors
  border: '#e9ecef',
  borderLight: '#dee2e6',
  
  // Status colors
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  
  // Shadow colors
  shadow: '#000',
  
  // Profile colors
  profileBackground: '#E0E0E0',
} as const;

export type ColorKey = keyof typeof Colors;
