import {IUser} from "../../users/interfaces/user.interface";
import {ReplaceUserDto} from "../../users/dto/replace-user.dto";
import {IReplaceUser} from "../../users/interfaces/replace-user.interface";
import {IUpdateUser} from "../../users/interfaces/update-user.interface";
import {ICreateUser} from "../../users/interfaces/create-user.interface";
import {ICreateUserResponse} from "../../users/interfaces/create-user-response.interface";
import {IReplaceUserResponse} from "../../users/interfaces/replace-user-response.interface";
import {IUpdateUserResponse} from "../../users/interfaces/update-user-response.interface";

export interface IAbstractDatabaseService {
    connect(): Promise<void>;

    disconnect(): Promise<void>;

    create(table: string, data: ICreateUser): Promise<ICreateUserResponse>;

    findOneById(table: string, data: number): Promise<IUser | null>;

    findOneByFirstName(table: string, data: string): Promise<IUser | null>;

    findByIdAndReplace(table: string, id: number, data: IReplaceUser): Promise<IReplaceUserResponse | null>;

    findByIdAndUpdate(table: string, id: number, data: IUpdateUser): Promise<IUpdateUserResponse | null>;

    findAll(table: string): Promise<IUser[]>;

    findByIdAndDelete(table: string, id: number): Promise<IUser | null>
}