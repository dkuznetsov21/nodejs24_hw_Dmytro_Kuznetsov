import {IsString} from 'class-validator';
import {ISignInUserInput} from "../interface/sign-in-user.interface";

export class SignInUserInputDto implements ISignInUserInput {
    @IsString()
    firstName: string;

    @IsString()
    password: string;
}