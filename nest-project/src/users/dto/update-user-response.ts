import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserResponseDto {
    @ApiProperty({
        description: 'The firstName of the user',
        example: 'John',
        required: false
    })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: 'The lastName of the user',
        example: 'Doe',
        required: false
    })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: 'The age of the user',
        example: 18,
        required: false
    })
    @IsOptional()
    @IsInt()
    age?: number;

    @ApiProperty({
        description: 'The study status of the user',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    isStudent?: boolean;
}
