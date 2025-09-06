import { EditGuestForm } from '@/components/forms/EditGuestForm';
import { Theme } from '@/constants/theme';
import { updateGuest } from '@/services/guestService';
import { Guest } from '@/types/guests';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function EditGuestsScreen(): React.JSX.Element {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [guest, setGuest] = useState<Guest | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const guestData = params.guest as string;
        if (guestData) {
            setGuest(JSON.parse(guestData) as Guest);
            setLoading(false);
        }
    }, []);

    const onSetName = (name: string) => {
        setName(name);
    };

    const onSetCarNumber = (carNumber: string) => {
        setCarNumber(carNumber);
    };
    const onSetPhoneNumber = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
    };
    const onSave = (id: string, name: string, carNumber: string, phoneNumber: string) => {
        setSaving(true);
        updateGuest(id, { name, carNumber, phoneNumber });
        setSaving(false);
    };

    const handleSave = () => {
        onSave(guest?.id || '', name, carNumber, phoneNumber);
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
                id={guest.id}
                onSetName={onSetName}
                onSetCarNumber={onSetCarNumber}
                onSetPhoneNumber={onSetPhoneNumber}
                name={name}
                carNumber={carNumber}
                phoneNumber={phoneNumber}
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
