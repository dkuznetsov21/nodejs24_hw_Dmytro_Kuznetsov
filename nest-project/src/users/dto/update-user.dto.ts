import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        description: 'The firstName of the user',
        example: 'John'
    })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: 'The lastName of the user',
        example: 'Doe'
    })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: 'The age of the user',
        example: 18
    })
    @IsOptional()
    @IsInt()
    age?: number;

    @ApiProperty({
        description: 'The study status of the user',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    isStudent?: boolean;
}
