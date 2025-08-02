import { Guest, updateGuest } from '@/services/guestService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { EditGuestForm } from '../../components/EditGuestForm';
import { Theme } from '../../constants/theme';

export default function EditGuestsScreen(): React.JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Extract guest data from route params
    const guestData = params.guest as string;
    if (guestData) {
      try {
        const parsedGuest = JSON.parse(guestData) as Guest;
        setGuest(parsedGuest);
        setLoading(false);
      } catch (error) {
        console.error('Failed to parse guest data:', error);
        Alert.alert('שגיאה', 'לא ניתן לטעון את פרטי האורח');
        router.back();
      }
    } else {
      Alert.alert('שגיאה', 'לא נמצאו פרטי אורח');
      router.back();
    }
  }, []);

  const handleSave = async (id: string, name: string, visitDate: string) => {
    setSaving(true);
    try {
      const updatedGuest = await updateGuest(id, { name, visitDate });
      if (updatedGuest) {
        Alert.alert('הצלחה', 'האורח עודכן בהצלחה', [
          {
            text: 'אישור',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('שגיאה', 'לא ניתן לעדכן את האורח');
      }
    } catch (error) {
      console.error('Failed to update guest:', error);
      Alert.alert('שגיאה', 'אירעה שגיאה בעדכון האורח');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!guest) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EditGuestForm
        guest={guest}
        onSave={handleSave}
        isLoading={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
});
