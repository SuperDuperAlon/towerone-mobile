import AsyncStorage from '@react-native-async-storage/async-storage';

// Add a new item to an array in storage
export async function addItem<T extends { id: string }>(storageKey: string, item: T): Promise<void> {
  const items = await getAllItems<T>(storageKey);
  console.log('Adding item:', items);
  items.push(item);
  await AsyncStorage.setItem(storageKey, JSON.stringify(items));
}

// Update an existing item in an array in storage
export async function updateItem<T extends { id: string }>(storageKey: string, id: string, updates: Partial<T>): Promise<T | null> {
  const items = await getAllItems<T>(storageKey);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return null;
  const updatedItem = { ...items[index], ...updates };
  items[index] = updatedItem;
  await AsyncStorage.setItem(storageKey, JSON.stringify(items));
  return updatedItem;
}

// Get a single item by id from an array in storage
export async function getItem<T extends { id: string }>(storageKey: string, id: string): Promise<T | null> {
  const items = await getAllItems<T>(storageKey);
  return items.find(i => i.id === id) || null;
}

// Get all items from an array in storage
export async function getAllItems<T>(storageKey: string): Promise<T[]> {
  const json = await AsyncStorage.getItem(storageKey);
  if (!json) return [];
  try {
    return JSON.parse(json) as T[];
  } catch {
    return [];
  }
}

// Remove an item by id from an array in storage
export async function removeItem<T extends { id: string }>(storageKey: string, id: string): Promise<boolean> {
  const items = await getAllItems<T>(storageKey);
  const newItems = items.filter(i => i.id !== id);
  if (newItems.length === items.length) return false;
  await AsyncStorage.setItem(storageKey, JSON.stringify(newItems));
  return true;
}
