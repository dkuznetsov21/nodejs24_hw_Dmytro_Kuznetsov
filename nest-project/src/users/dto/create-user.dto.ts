import {IsString, IsInt, IsBoolean} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'The firstName of the user',
        example: 'John'
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The lastName of the user',
        example: 'Doe'
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '1n48asn#$1!'
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The age of the user',
        example: 18
    })
    @IsInt()
    age: number;

    @ApiProperty({
        description: 'The study status of the user',
        example: true
    })
    @IsBoolean()
    isStudent: boolean;
}
