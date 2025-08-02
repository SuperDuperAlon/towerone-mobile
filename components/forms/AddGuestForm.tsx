import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddGuestFormProps {
  onAddGuest: (name: string, visitDate: string) => void;
}

export function AddGuestForm({ onAddGuest }: AddGuestFormProps): React.JSX.Element {
  const [name, setName] = useState('');
  const [visitDate, setVisitDate] = useState('');

  const handleSubmit = () => {
    if (name.trim() && visitDate.trim()) {
      onAddGuest(name.trim(), visitDate.trim());
      setName('');
      setVisitDate('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="שם האורח"
        placeholderTextColor={Theme.colors.textMuted}
        value={name}
        onChangeText={setName}
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="תאריך ביקור (YYYY-MM-DD)"
        placeholderTextColor={Theme.colors.textMuted}
        value={visitDate}
        onChangeText={setVisitDate}
        textAlign="right"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={!name.trim() || !visitDate.trim()}
      >
        <Text style={styles.buttonText}>{Strings.common.submit}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.card,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: Theme.colors.background,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 