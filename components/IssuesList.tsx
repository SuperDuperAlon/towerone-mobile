import React from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../constants/strings';
import { IssueReport } from '../types';

interface IssuesListProps {
  issues: IssueReport[];
}

export const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <Text style={{ color: '#888', textAlign: 'right' }}>
        {Strings.reportIssue.noIssues}
      </Text>
    );
  }

  return (
    <>
      {issues.map((issue: IssueReport) => (
        <View
          key={issue.id}
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
            backgroundColor: '#fafbfc',
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{issue.title}</Text>
          <Text style={{ color: '#555', marginBottom: 4 }}>{issue.details}</Text>
          <Text style={{ fontSize: 12, color: '#888' }}>
            {Strings.reportIssue.status}: {issue.status}
          </Text>
        </View>
      ))}
    </>
  );
}; 