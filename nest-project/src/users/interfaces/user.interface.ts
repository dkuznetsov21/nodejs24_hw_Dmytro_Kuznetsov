export interface IUser {
    _id?: string;
    id: number;
    firstName: string,
    lastName: string,
    password: string,
    age: number,
    isStudent: boolean
    accessToken?: string;
    refreshToken?: string;
}
