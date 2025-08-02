import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

export function Collapsible({ title, children, initiallyExpanded = false }: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.title}>{title}</ThemedText>
        <IconSymbol
          name={isExpanded ? 'chevron.right' : 'chevron.right'}
          size={20}
          color={colorScheme === 'dark' ? Colors.textPrimary : Colors.textPrimary}
          style={[
            styles.icon,
            isExpanded && styles.iconExpanded,
          ]}
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    transform: [{ rotate: '0deg' }],
  },
  iconExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
}); 