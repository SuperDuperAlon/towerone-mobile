import { Guest } from '@/types/guests';
import { addItem, getAllItems, removeItem, updateItem } from './localStorageService';

// Storage key for guests
const GUESTS_STORAGE_KEY = 'guestsDB';

// CREATE - Add new guest
export const createGuest = async (
  guestData: Omit<Guest, 'id'>
): Promise<Guest> => {
  // Generate a unique ID for the guest
  const id = Math.random().toString(36).substr(2, 9);
  const createdAt = new Date();
  const newGuest: Guest = {
    id,
    ...guestData,
    createdAt,
  };
  await addItem(GUESTS_STORAGE_KEY, newGuest);
  return newGuest;
}

// READ - Get all guests
export const getGuests = async (): Promise<Guest[]> => {
  const guests = await getAllItems<Guest>(GUESTS_STORAGE_KEY);
  // Sort by visitDate descending
  return guests.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
};

// READ - Get single guest by ID
export const getGuest = async (id: string): Promise<Guest | null> => {
  const guests = await getAllItems<Guest>(GUESTS_STORAGE_KEY);
  const guest = guests.find(g => g.id === id);
  return guest || null;
};

// UPDATE - Update guest
export const updateGuest = async (
  id: string,
  updates: Partial<Omit<Guest, 'id'>>
): Promise<Guest | null> => {
  const updated = await updateItem<Guest>(GUESTS_STORAGE_KEY, id, updates);
  return updated;
};

// DELETE - Delete guest
export const deleteGuest = async (id: string): Promise<boolean> => {
  return await removeItem<Guest>(GUESTS_STORAGE_KEY, id);
};
