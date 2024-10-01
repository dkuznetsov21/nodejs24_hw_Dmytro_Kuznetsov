import { IUser } from './user.interface';

// Update input can't have id field
export type IUpdateUserInput = Partial<Omit<IUser, 'id'>>;