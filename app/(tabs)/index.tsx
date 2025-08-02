import { ActionButton } from '@/components/buttons/ActionButton';
import { ProfileHeader } from '@/components/headers/ProfileHeader';
import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { User } from '@/types';
import { initializeRTL } from '@/utils/rtlConfig';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Initialize RTL layout for Hebrew
initializeRTL();

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  
  // Mock user data - in real app this would come from context or API
  const user: User = {
    id: '1',
    name: 'אלון מליאבסקי',
    apartment: '2',
  };
  
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <ActionButton
          icon="📋"
          title={Strings.home.reportIssue}
          onPress={() => router.push('/issues/myIssues')}
        />

        <ActionButton
          icon="🧑‍🤝‍🧑"
          title={Strings.home.guests}
          onPress={() => router.push('/guests/myGuests')}
        />

        <ActionButton
          icon="📨"
          title={Strings.home.committeeMessages}
          onPress={() => {
            // TODO: Navigate to committee messages
            console.log('Committee messages pressed');
          }}
        />

        <ActionButton
          icon="👤"
          title={Strings.home.userDetails}
          onPress={() => {
            // TODO: Navigate to user details
            console.log('User details pressed');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: Theme.layout.containerPadding,
    paddingTop: Theme.layout.screenPaddingTop,
    paddingBottom: Theme.layout.screenPaddingBottom,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
}); 