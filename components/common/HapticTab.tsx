import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HapticTab() {
  if (Platform.OS === 'ios') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
} 