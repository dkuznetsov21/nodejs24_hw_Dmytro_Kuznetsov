import {IUser} from "../../users/interfaces/user.interface";

export interface IAbstractDatabaseService {
    connect(): Promise<void>;

    disconnect(): Promise<void>;

    create(table: string, data: IUser): Promise<IUser>;

    findOneById(table: string, data: number): Promise<IUser | null>;

    findOneByFirstName(table: string, data: string): Promise<IUser | null>;

    findAll(table: string): Promise<IUser[]>;

    replaceById(table: string, id: number): Promise<IUser | null>
}