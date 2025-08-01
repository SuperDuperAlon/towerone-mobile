import { I18nManager } from 'react-native';

export const initializeRTL = (): void => {
  I18nManager.forceRTL(true);
};

export const isRTL = (): boolean => {
  return I18nManager.isRTL;
}; 