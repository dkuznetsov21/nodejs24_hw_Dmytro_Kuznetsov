import {IsString} from 'class-validator';
import {ISignInUserInput} from "../interface/sign-in-user.interface";
import {ApiProperty} from "@nestjs/swagger";

export class SignInUserInputDto implements ISignInUserInput {
    @ApiProperty({
        description: 'The firstName of the user',
        example: 'John'
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '23k4b21!'
    })
    @IsString()
    password: string;
}