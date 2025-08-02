import { AddGuestForm } from '@/components/AddGuestForm';
import { Button } from '@/components/ui/Button';
import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { createGuest, deleteGuest, Guest } from '@/services/guestService';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';


export default function MyGuestsScreen(): React.JSX.Element {
    const router = useRouter();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadGuests = async () => {
            const { getGuests } = await import('@/services/guestService');
            const data = await getGuests();
            if (isMounted) {
                setGuests(data);
                setLoading(false);
            }
        };
        loadGuests();
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

    async function removeGuest(id: string) {
        setLoading(true);
        try {
            await deleteGuest(id);
            setGuests((prev) => prev.filter((guest) => guest.id !== id));
        } finally {
            setLoading(false);
        }
    }

    function navigateToEdit(guest: Guest) {
        router.push({
            pathname: '/guests/editGuests',
            params: { guest: JSON.stringify(guest) }
        });
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const { getGuests } = await import('@/services/guestService');
            const data = await getGuests();
            setGuests(data);
        } finally {
            setRefreshing(false);
        }
    };

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
                            <Button title="מחק" onPress={() => removeGuest(item.id)} />
                            <Button title="ערוך" onPress={() => navigateToEdit(item)} />
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
