import {IAbstractDatabaseService} from './types/database-abstract-service.interface';
import {IUser} from "../users/interfaces/user.interface";

export abstract class AbstractDatabaseService
    implements IAbstractDatabaseService {
    abstract connect(): Promise<void>;

    abstract disconnect(): Promise<void>;

    abstract create(table: string, data: object): Promise<IUser>;

    abstract findOneById(table: string, data: number): Promise<IUser>;

    abstract findOneByFirstName(table: string, data: string): Promise<IUser>;

    abstract findAll(table: string): Promise<IUser[]>;

    //TODO I don't understand what of type i should Promise here
    abstract replaceById(table: string, data: number): Promise<IUser>
}