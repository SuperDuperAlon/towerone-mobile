import { IssueReport } from '../types';
import { generateId } from '../utils/utilFunctions';
import { addItem, getAllItems, removeItem, updateItem } from './localStorageService';


const STORAGE_KEY = 'issuesDB';

// CREATE - Add new issue
export const createIssue = async (
  issueData: Omit<IssueReport, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<IssueReport> => {
  const now = new Date();
  const newIssue: IssueReport = {
    id: generateId(),
    ...issueData,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  await addItem(STORAGE_KEY, newIssue as IssueReport & { id: string });
  return newIssue;
};


// READ - Get all issues
export const getIssues = async (): Promise<IssueReport[]> => {
  return await getAllItems<IssueReport & { id: string }>(STORAGE_KEY);
};


// READ - Get single issue
export const getIssue = async (id: string): Promise<IssueReport | null> => {
  const issues = await getAllItems<IssueReport & { id: string }>(STORAGE_KEY);
  const issue = issues.find(i => i.id === id);
  return issue || null;
};

// UPDATE - Update issue
export const updateIssue = async (
  id: string,
  updates: Partial<Omit<IssueReport, 'id' | 'createdAt'>>
): Promise<IssueReport | null> => {
  const now = new Date();
  // Always update the updatedAt field
  const updatedFields = { ...updates, updatedAt: now };
  const updated = await updateItem<IssueReport & { id: string }>(STORAGE_KEY, id, updatedFields);
  return updated;
};

// DELETE - Delete issue
export const deleteIssue = async (id: string): Promise<boolean> => {
  return await removeItem<IssueReport & { id: string }>(STORAGE_KEY, id);
};