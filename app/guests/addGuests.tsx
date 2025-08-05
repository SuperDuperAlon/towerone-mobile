import { AddGuestForm } from '@/components/forms/AddGuestForm';
import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { createGuest } from '@/services/guestService';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function AddGuestsScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGuest = async () => {
    setIsLoading(true);
    await createGuest({ name, carNumber, phoneNumber, createdAt: new Date() });
    router.push('/guests/myGuests');
    setIsLoading(false);
  };

  const onSetName = (name: string) => {
    setName(name);
  };

  const onSetCarNumber = (carNumber: string) => {
    setCarNumber(carNumber);
  };

  const onSetPhoneNumber = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  

  return (
    <View style={styles.container}>
      <AddGuestForm
        name={name}
        onSetName={onSetName}
        carNumber={carNumber}
        onSetCarNumber={onSetCarNumber}
        phoneNumber={phoneNumber}
        onSetPhoneNumber={onSetPhoneNumber}
        isLoading={isLoading}
        onSave={handleAddGuest}
      />
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleAddGuest}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? (Strings?.common?.loading || 'טוען...') : (Strings?.common?.save || 'שמור')}
          </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'right',
    color: Theme.colors.textPrimary,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Theme.colors.card,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
