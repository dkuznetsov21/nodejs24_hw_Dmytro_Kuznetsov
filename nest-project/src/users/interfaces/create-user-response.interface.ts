import {ICreateUser} from "./create-user.interface";

export interface ICreateUserResponse extends ICreateUser {
    id: number;
}
