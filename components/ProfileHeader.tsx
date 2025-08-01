import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { Theme } from '../constants/theme';
import { User } from '../types';

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <View style={styles.profileImage}>
            {user.profileImage ? (
              <Text style={styles.profileImageText}>👤</Text>
            ) : (
              <Text style={styles.profileImageText}>👤</Text>
            )}
          </View>
        </View>
        
        {/* User Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.greeting}>{Strings.home.greeting}</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.apartment}>
            {Strings.home.apartment} {user.apartment}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xxxl,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: Theme.borderRadius.xxl,
    backgroundColor: Colors.profileBackground,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImageText: {
    fontSize: 48,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  greeting: {
    fontSize: Theme.typography.sizes.base,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  name: {
    fontSize: Theme.typography.sizes.display,
    fontWeight: Theme.typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: Theme.spacing.sm,
  },
  apartment: {
    fontSize: Theme.typography.sizes.lg,
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: Theme.spacing.sm,
  },
}); 