import {IAbstractDatabaseService} from './types/database-abstract-service.interface';
import {IUser} from "../users/interfaces/user.interface";

export abstract class AbstractDatabaseService
    implements IAbstractDatabaseService {
    abstract connect(): Promise<void>;

    abstract disconnect(): Promise<void>;

    abstract create(table: string, data: IUser): Promise<IUser>;

    abstract findOneById(table: string, data: number): Promise<IUser | null>;

    abstract findOneByFirstName(table: string, data: string): Promise<IUser | null>;

    abstract findAll(table: string): Promise<IUser[]>;

    abstract replaceById(table: string, id: number): Promise<IUser | null>
}