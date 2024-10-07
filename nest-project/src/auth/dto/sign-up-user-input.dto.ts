import { ISignUpUserInput } from '../interface/sign-up-user.interface';
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class SignUpUserInputDto implements ISignUpUserInput {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsInt()
    age: number;

    @IsBoolean()
    isStudent: boolean;
}