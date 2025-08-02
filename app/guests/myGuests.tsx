import { createGuest } from '@/services/guestService';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { AddGuestForm } from '../../components/AddGuestForm';
import { Strings } from '../../constants/strings';
import { Theme } from '../../constants/theme';

// Mock guest data type
type Guest = {
  id: string;
  name: string;
  visitDate: string;
};

// Mock fetch function (replace with real API call)
async function fetchGuests(): Promise<Guest[]> {
  // Dynamically import the getGuests function to avoid circular dependencies if any
  const { getGuests } = await import('@/services/guestService');
  return await getGuests();
}


export default function MyGuestsScreen(): React.JSX.Element {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchGuests().then((data) => {
      if (isMounted) {
        setGuests(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  
  async function addGuest(name: string, visitDate: string) {
    setLoading(true);
    try {
      const newGuest = await createGuest({ name, visitDate });
      setGuests((prev) => [newGuest, ...prev]);
    } finally {
      setLoading(false);
    }
  }
  

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Add Guest Form */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'right' }}>
          {Strings?.guests?.addGuestTitle || 'הוסף אורח חדש'}
        </Text>
        <AddGuestForm onAddGuest={addGuest} />
      </View>
      <Text style={styles.header}>
        {Strings?.guests?.myGuestsTitle || 'האורחים שלי'}
      </Text>
      {guests.length === 0 ? (
        <Text style={styles.emptyText}>
          {Strings?.guests?.noGuests || 'אין אורחים להצגה.'}
        </Text>
      ) : (
        <FlatList
          data={guests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.guestItem}>
              <Text style={styles.guestName}>{item.name}</Text>
              <Text style={styles.guestDate}>
                {Strings?.guests?.visitDateLabel || 'תאריך ביקור'}: {item.visitDate}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: Theme.layout.containerPadding,
    paddingTop: Theme.layout.screenPaddingTop,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'right',
  },
  guestItem: {
    backgroundColor: Theme.colors.card,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  guestName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'right',
  },
  guestDate: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
