import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/components/common/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Colors } from '@/constants/colors';

export function ParallaxScrollView({
  headerBackgroundColor,
  headerImage,
  headerTitle,
  children,
}: {
  headerBackgroundColor: string;
  headerImage: any;
  headerTitle: string;
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const tabBarOverflow = useBottomTabOverflow();

  const onPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: tabBarOverflow }}
      scrollEventThrottle={16}
    >
      <View style={[styles.item, { backgroundColor: headerBackgroundColor }]}>
        <View style={styles.itemHeader}>
          <Image source={headerImage} style={styles.itemImage} />
          <View style={styles.itemOverlay} />
          <ThemedView style={styles.itemTitleContainer}>
            <Text style={styles.itemTitle}>{headerTitle}</Text>
          </ThemedView>
        </View>
        <View style={styles.itemContent}>
          <View style={styles.itemTextContainer}>
            <Text style={[styles.itemText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {children}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 300,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  itemHeader: {
    height: 200,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  itemTitleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  itemContent: {
    flex: 1,
    padding: 20,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 