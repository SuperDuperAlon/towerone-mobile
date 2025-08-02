import { IssuesList } from '@/components/lists/IssuesList';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Strings } from '@/constants/strings';
import { Theme } from '@/constants/theme';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useForm } from '@/hooks/useForm';
import { createIssue, getIssues } from '@/services/issuesService';
import { IssueReport, IssueReportForm } from '@/types';
import { initializeRTL } from '@/utils/rtlConfig';
import { ValidationRules } from '@/utils/validation';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
// Initialize RTL layout for Hebrew
initializeRTL();





export default function ReportIssueScreen(): React.JSX.Element {
  const { handleError } = useErrorHandler();



    const [issues, setIssues] = useState<IssueReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const fetchIssues = async () => {
        setLoading(true);
        try {
          const data = await getIssues();
          setIssues(data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };

      // Fetch issues on mount
      fetchIssues();

    }, []);


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
        // Submit issue report using local storage
        const issueData = {
          title: values.title,
          details: values.details,
          userId: 'current-user-id', // TODO: Get from auth context
        };

        const result = await createIssue(issueData);

        // Update UI: add new issue to the top of the list
        setIssues((prevIssues) => [result, ...prevIssues]);

        // Reset form
        form.reset();
      } catch (error) {
        handleError(error as Error, 'שגיאה בשמירת הדיווח');
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
      {/* List of All Issues */}

      {/* List of All Issues */}
      <View style={{ marginTop: 32 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
          {Strings.reportIssue.allIssues}
        </Text>
        <IssuesList issues={issues} />
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