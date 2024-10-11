import {IsString, IsInt, IsBoolean} from 'class-validator';

export class CreateUserDto {
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
