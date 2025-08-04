import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function validateGuest(name: string, visitDate: string) {
  const errors: { name?: string; visitDate?: string } = {};
  if (!name.trim()) {
    errors.name = Strings?.guests?.nameRequired || 'יש להזין שם אורח';
  }
  if (!visitDate.trim()) {
    errors.visitDate = Strings?.guests?.visitDateRequired || 'יש להזין תאריך ביקור';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
    errors.visitDate = Strings?.guests?.visitDateInvalid || 'פורמט תאריך לא תקין (YYYY-MM-DD)';
  }
  return errors;
}

export default function AddGuestsScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [errors, setErrors] = useState<{ name?: string; carNumber?: string; phoneNumber?: string; visitDate?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGuest = async () => {
    const validationErrors = validateGuest(name, visitDate);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      const { createGuest } = await import('@/services/guestService');
      await createGuest({ 
        name, 
        carNumber, 
        phoneNumber, 
        createdAt: new Date() 
      });
      Alert.alert(
        Strings?.guests?.guestAddedTitle || 'אורח נוסף',
        Strings?.guests?.guestAddedMessage || 'האורח נוסף בהצלחה!',
        [
          {
            text: Strings?.common?.save || 'אישור',
            onPress: () => router.push('/guests/myGuests'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        Strings?.guests?.addGuestErrorTitle || 'שגיאה',
        Strings?.guests?.addGuestErrorMessage || 'אירעה שגיאה בהוספת האורח'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {Strings?.guests?.addGuestTitle || 'הוסף אורח חדש'}
      </Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>שם האורח</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="שם האורח"
            placeholderTextColor={Theme.colors.textMuted}
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            textAlign="right"
            editable={!isLoading}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>מספר רכב</Text>
          <TextInput
            style={[styles.input, errors.carNumber && styles.inputError]}
            placeholder="מספר רכב"
            placeholderTextColor={Theme.colors.textMuted}
            value={carNumber}
            onChangeText={text => {
              setCarNumber(text);
              if (errors.carNumber) setErrors(prev => ({ ...prev, carNumber: undefined }));
            }}
            textAlign="right"
            editable={!isLoading}
          />
          {errors.carNumber && <Text style={styles.errorText}>{errors.carNumber}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>מספר טלפון</Text>
          <TextInput
            style={[styles.input, errors.phoneNumber && styles.inputError]}
            placeholder="מספר טלפון"
            placeholderTextColor={Theme.colors.textMuted}
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: undefined }));
            }}
            textAlign="right"
            editable={!isLoading}
            keyboardType="phone-pad"
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
        </View>
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
