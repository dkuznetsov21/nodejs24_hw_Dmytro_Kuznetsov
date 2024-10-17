import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean } from "class-validator";

export class DeleteUserResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: '123',
    })
    @IsString()
    id: number;

    @ApiProperty({
        description: 'The firstName of the user',
        example: 'John',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The lastName of the user',
        example: 'Doe',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'The age of the user',
        example: 18,
    })
    @IsInt()
    age: number;

    @ApiProperty({
        description: 'The study status of the user',
        example: true,
    })
    @IsBoolean()
    isStudent: boolean;
}
