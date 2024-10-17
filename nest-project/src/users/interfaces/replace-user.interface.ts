import { IUser } from './user.interface';

export type IReplaceUser = Partial<Omit<IUser, 'id'>>;