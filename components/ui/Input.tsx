import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { InputProps } from '../../types';

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  error,
  required = false,
  validationRules,
  style,
  ...textInputProps
}) => {
  const inputStyle = [
    styles.input,
    multiline && styles.multilineInput,
    error && styles.inputError,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textLight}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        textAlign="right"
        textAlignVertical={multiline ? 'top' : 'center'}
        {...textInputProps}
      />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
  },
  labelContainer: {
    marginBottom: Theme.spacing.sm,
  },
  label: {
    fontSize: Theme.typography.sizes.base,
    fontWeight: Theme.typography.weights.semibold,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  required: {
    color: Colors.error,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    fontSize: Theme.typography.sizes.base,
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundSecondary,
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: Theme.spacing.md,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: Theme.typography.sizes.sm,
    color: Colors.error,
    marginTop: Theme.spacing.xs,
    textAlign: 'right',
  },
}); 