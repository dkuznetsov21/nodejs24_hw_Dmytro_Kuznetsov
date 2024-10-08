export interface IUser {
    id: number;
    firstName: string,
    lastName: string,
    password: string,
    age: number,
    isStudent: boolean
    accessToken?: string;
    refreshToken?: string;
}
