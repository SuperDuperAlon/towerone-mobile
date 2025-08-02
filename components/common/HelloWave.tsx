import { ThemedText } from '@/components/common/ThemedText';
import { useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export function HelloWave() {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.hand, { transform: [{ rotate }] }]}>
        <Text style={styles.handEmoji}>👋</Text>
      </Animated.View>
      <ThemedText style={styles.text}>Hello!</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hand: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handEmoji: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 