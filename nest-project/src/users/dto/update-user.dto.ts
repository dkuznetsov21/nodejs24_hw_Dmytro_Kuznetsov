import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsInt()
    age?: number;

    @IsOptional()
    @IsBoolean()
    isStudent?: boolean;
}
