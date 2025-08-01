import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Strings } from '../../constants/strings';
import { Theme } from '../../constants/theme';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useForm } from '../../hooks/useForm';
import { IssueReportForm } from '../../types';
import { initializeRTL } from '../../utils/rtlConfig';
import { ValidationRules } from '../../utils/validation';

// Initialize RTL layout for Hebrew
initializeRTL();

export default function ReportIssueScreen(): React.JSX.Element {
  const { handleError } = useErrorHandler();

  const form = useForm<IssueReportForm>({
    initialValues: {
      title: '',
      details: '',
    },
    validationRules: {
      title: ValidationRules.title,
      details: ValidationRules.details,
    },
    onSubmit: async (values) => {
      try {
        // Log the form data
        console.log('Issue Report Submitted:', values);
        
        // TODO: Send to API
        // await api.submitIssueReport(values);
        
        // Show success message
        // In a real app, you might want to show a toast or navigate back
        console.log('Report submitted successfully');
        
        // Reset form
        form.reset();
      } catch (error) {
        handleError(error as Error, 'שגיאה בשליחת הדיווח');
      }
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{Strings.reportIssue.title}</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Issue Title Input */}
        <Input
          label={Strings.reportIssue.issueTitle}
          value={form.values.title}
          onChangeText={(text) => form.setValue('title', text)}
          placeholder={Strings.reportIssue.issueTitlePlaceholder}
          required
          error={form.errors.title}
        />

        {/* Issue Details Input */}
        <Input
          label={Strings.reportIssue.issueDetails}
          value={form.values.details}
          onChangeText={(text) => form.setValue('details', text)}
          placeholder={Strings.reportIssue.issueDetailsPlaceholder}
          multiline
          numberOfLines={4}
          required
          error={form.errors.details}
        />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title={Strings.reportIssue.attachImage}
            onPress={() => {
              // TODO: Implement image attachment
              console.log('Attach image pressed');
            }}
            variant="secondary"
            size="medium"
          />

          <Button
            title={Strings.reportIssue.sendReport}
            onPress={form.handleSubmit}
            loading={form.loading}
            disabled={form.hasErrors}
            size="large"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: Theme.layout.containerPadding,
    paddingTop: Theme.layout.screenPaddingTop,
    paddingBottom: Theme.layout.screenPaddingBottom,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: Theme.spacing.xxl,
  },
  title: {
    fontSize: Theme.typography.sizes.xxxl,
    fontWeight: Theme.typography.weights.bold,
    color: '#11181C',
    textAlign: 'right',
  },
  form: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
}); 