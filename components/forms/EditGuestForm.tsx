import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { Guest } from '@/types/guests';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditGuestFormProps {
  guest: Guest;
  onSave: (id: string, name: string, carNumber: string, phoneNumber: string) => void;
  isLoading?: boolean;
}

export function EditGuestForm({ guest, onSave, isLoading = false }: EditGuestFormProps): React.JSX.Element {
  const [name, setName] = useState(guest.name);
  const [errors, setErrors] = useState<{ name?: string; visitDate?: string }>({});

  useEffect(() => {
    // Update form when guest prop changes
    setName(guest.name);
    setErrors({});
  }, [guest]);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; visitDate?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'שם האורח הוא שדה חובה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(guest.id, name.trim(), guest.carNumber, guest.phoneNumber);
      // After saving, navigate to the guests page
      router.push('/guests/myGuests');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {Strings?.guests?.editGuestTitle || 'ערוך אורח'}
      </Text>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>שם האורח</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="שם האורח"
            placeholderTextColor={Theme.colors.textMuted}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            textAlign="right"
            editable={!isLoading}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'שומר...' : (Strings?.common?.save || 'שמור')}
          </Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 