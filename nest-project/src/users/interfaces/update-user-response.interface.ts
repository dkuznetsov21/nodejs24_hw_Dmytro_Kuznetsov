import {IUpdateUser} from "./update-user.interface";

export interface IUpdateUserResponse extends IUpdateUser {
    id: number;
    refreshToken?: string;
}
