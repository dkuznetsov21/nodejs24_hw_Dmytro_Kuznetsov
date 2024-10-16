import {IAbstractDatabaseService} from './types/database-abstract-service.interface';
import {IUser} from "../users/interfaces/user.interface";
import {ReplaceUserDto} from "../users/dto/replace-user.dto";
import {IReplaceUser} from "../users/interfaces/replace-user.interface";
import {IUpdateUser} from "../users/interfaces/update-user.interface";
import {ICreateUser} from "../users/interfaces/create-user.interface";
import {ICreateUserResponse} from "../users/interfaces/create-user-response.interface";
import {IReplaceUserResponse} from "../users/interfaces/replace-user-response.interface";
import {IUpdateUserResponse} from "../users/interfaces/update-user-response.interface";

export abstract class AbstractDatabaseService
    implements IAbstractDatabaseService {
    abstract connect(): Promise<void>;

    abstract disconnect(): Promise<void>;

    abstract create(table: string, data: ICreateUser): Promise<ICreateUserResponse>;

    abstract findOneById(table: string, data: number): Promise<IUser | null>;

    abstract findOneByFirstName(table: string, data: string): Promise<IUser | null>;

    abstract findByIdAndReplace(table: string, id: number, data: IReplaceUser): Promise<IReplaceUserResponse | null>;

    abstract findByIdAndUpdate(table: string, id: number, data: IUpdateUser): Promise<IUpdateUserResponse | null>;

    abstract findAll(table: string): Promise<IUser[]>;

    abstract findByIdAndDelete(table: string, id: number): Promise<IUser | null>
}