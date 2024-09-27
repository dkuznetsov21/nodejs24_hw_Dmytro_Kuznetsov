import {IsString, IsInt, IsBoolean, IsIn} from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsInt()
    age: number;

    @IsBoolean()
    isStudent: boolean;
}
