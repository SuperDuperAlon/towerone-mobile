export type Guest = {
    id: string;
    name: string;
    carNumber: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt?: Date;
    expiresAt?: Date;
  };