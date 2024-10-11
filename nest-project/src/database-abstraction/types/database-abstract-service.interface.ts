import {IUser} from "../../users/interfaces/user.interface";

export interface IAbstractDatabaseService {
    connect(): Promise<void>;

    disconnect(): Promise<void>;

    create(table: string, data: object): Promise<IUser>;

    findOneById(table: string, data: number): Promise<IUser>;

    findOneByFirstName(table: string, data: string): Promise<IUser>;

    findAll(table: string): Promise<IUser[]>;

    //TODO I don't understand what of type i should Promise here
    replaceById(table: string, data: number): Promise<IUser>
}