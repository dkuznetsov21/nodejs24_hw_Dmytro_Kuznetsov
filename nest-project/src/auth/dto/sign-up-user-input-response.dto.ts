import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {ISignUpUserResponse} from "../interface/sign-up-user-response.interface";

export class SignUpUserInputResponseDto implements ISignUpUserResponse {
    @ApiProperty({
        description: 'A accessToken',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiRGltb3NuIiwiaWF0IjoxNzI5MTcyMzM5LCJleHAiOjE3MjkxNzMyMzl9.THR41zB3PDAb0zCRcUuJ5ogNZTUthp--NnQHefmmQfo'
    })
    @IsString()
    accessToken: string;

    @ApiProperty({
        description: 'A refreshToken',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiRGltb3NuIiwiaWF0IjoxNzI5MTcyMzM5LCJleHAiOjE3Mjk3NzcxMzl9.e0wQuRfM1Bj11Mzf2dhrungQZn11Cjd8S3421uwNFDQ'
    })
    @IsString()
    refreshToken: string;
}