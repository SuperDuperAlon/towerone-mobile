import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditGuestFormProps {
  id: string;
  name: string;
  carNumber: string;
  phoneNumber: string;
  onSave: (id: string, name: string, carNumber: string, phoneNumber: string) => void;
  isLoading?: boolean;  
  onSetName: (name: string) => void;
  onSetCarNumber: (carNumber: string) => void;
  onSetPhoneNumber: (phoneNumber: string) => void;
}

export function EditGuestForm({
  id,
  name,
  carNumber,
  phoneNumber,
  onSave,
  isLoading = false,
  onSetName,
  onSetCarNumber,
  onSetPhoneNumber,
}: EditGuestFormProps): React.JSX.Element {




  const handleSave = () => {
    onSave(id, name, carNumber, phoneNumber);
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
            value={name}
            onChangeText={onSetName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>מספר רכב</Text>
          <TextInput
            value={carNumber}
            onChangeText={onSetCarNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>מספר טלפון</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={onSetPhoneNumber}
          />
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