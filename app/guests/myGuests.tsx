import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { deleteGuest } from '@/services/guestService';
import { Guest } from '@/types/guests';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function MyGuestsScreen(): React.JSX.Element {
    const router = useRouter();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <View style={styles.container}>
            {/* Add Guest Form */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/guests/addGuests')}
            >
                <Text style={styles.addButtonText}>
                    {Strings?.guests?.addGuestTitle || 'הוסף אורח חדש'}
                </Text>
            </TouchableOpacity>
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
                            <View style={styles.guestInfo}>
                                <Text style={styles.guestName}>{item.name}</Text>
                                <Text style={styles.guestDate}>{item.carNumber}</Text>
                                <Text style={styles.guestDate}>{item.phoneNumber}</Text>
                            </View>
                            <View style={styles.guestActions}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteButton]}
                                    onPress={() => removeGuest(item.id)}
                                >
                                    <Text style={styles.actionButtonText}>
                                        {Strings?.common?.delete || 'מחק'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.editButton]}
                                    onPress={() => navigateToEdit(item)}
                                >
                                    <Text style={styles.actionButtonText}>
                                        {Strings?.common?.edit || 'ערוך'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
    addGuestSection: {
        marginBottom: 24,
    },
    addGuestTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right',
    },
    guestInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    guestActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    deleteButton: {
        backgroundColor: '#ff4444',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    editButton: {
        backgroundColor: Theme.colors.primary,
    },
    addButton: {
        backgroundColor: Theme.colors.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
