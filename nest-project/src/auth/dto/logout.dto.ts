import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LogoutResponseDto {
    @ApiProperty({
        description: 'The status of a logout',
        example: 'success'
    })
    @IsString()
    status: string;
}