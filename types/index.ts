// User related types
export interface User {
  id: string;
  name: string;
  apartment: string;
  email?: string;
  phone?: string;
  profileImage?: string;
}

// Issue report types
export interface IssueReport {
  id?: string;
  title: string;
  details: string;
  images?: string[];
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type IssueStatus = 'pending' | 'in-progress' | 'resolved' | 'closed';

// Form types
export interface IssueReportForm extends Record<string, string> {
  title: string;
  details: string;
  images?: string[];
}

// Navigation types
export type RootStackParamList = {
  '/(tabs)': undefined;
  '/(tabs)/index': undefined;
  '/(tabs)/ReportIssueScreen': undefined;
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// Component prop types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  required?: boolean;
  validationRules?: ValidationRule[];
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
} 