import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface AddGuestFormProps {
  name: string;
  carNumber: string;
  phoneNumber: string;
  isLoading: boolean;
  onSave: (name: string, carNumber: string, phoneNumber: string) => void;
  onSetName: (name: string) => void;
  onSetCarNumber: (carNumber: string) => void;
  onSetPhoneNumber: (phoneNumber: string) => void;
}

export function AddGuestForm({ name, carNumber, phoneNumber, onSetName, onSetCarNumber, onSetPhoneNumber, isLoading, onSave }: AddGuestFormProps): React.JSX.Element {

  const handleSubmit = () => {
    onSave(name, carNumber, phoneNumber);
  };

  return (
    <View>
      <Text>Add Guest Form</Text>

      <TextInput
        style={styles.input}
        placeholder={Strings?.guests?.namePlaceholder || 'הכנס שם אורח'}
        placeholderTextColor={Theme.colors.textMuted}
        value={name}
        onChangeText={onSetName}
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder={Strings?.guests?.carNumberPlaceholder || 'הכנס מספר רכב'}
        placeholderTextColor={Theme.colors.textMuted}
        value={carNumber}
        onChangeText={onSetCarNumber}
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder={Strings?.guests?.phoneNumberPlaceholder || 'הכנס מספר טלפון'}
        placeholderTextColor={Theme.colors.textMuted}
        value={phoneNumber}
        onChangeText={onSetPhoneNumber}
        textAlign="right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Theme.colors.card,
  },
}); 