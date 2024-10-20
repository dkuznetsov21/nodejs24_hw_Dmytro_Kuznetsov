import {Controller, Post, Body, UseGuards, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Request} from 'express';
import {SignUpUserInputDto} from './dto/sign-up-user-input.dto';
import {SignInUserInputDto} from "./dto/sign-in-user-input.dto";
import {AccessTokenGuard} from "../guargs/access-token.guard";
import {RefreshTokenGuard} from "../guargs/refresh-token.guard";
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SignUpUserInputResponseDto} from "./dto/sign-up-user-input-response.dto";
import {ILogoutResponse} from "./interface/logout-response.interface";
import {SignInUserInputResponseDto} from "./dto/sign-in-user-input-response.dto";
import {LogoutResponseDto} from "./dto/logout.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('sign-up')
    @ApiResponse({status: 201, description: 'User has been created', type: SignUpUserInputResponseDto})
    async signup(@Body() signUpUserDto: SignUpUserInputDto): Promise<SignUpUserInputResponseDto> {
        return this.authService.signUp(signUpUserDto);
    }

    @Post('sign-in')
    @ApiResponse({status: 200, description: 'User has been login', type: SignInUserInputResponseDto})
    async signIn(@Body() signInUserDto: SignInUserInputDto): Promise<SignInUserInputResponseDto> {
        return this.authService.signIn(signInUserDto);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessTokenGuard)
    @Post('logout')
    @ApiResponse({status: 200, description: 'User has been logout', type: LogoutResponseDto})
    async logout(@Req() req: Request): Promise<ILogoutResponse> {
        return this.authService.logout(req.user['sub']);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(RefreshTokenGuard)
    @ApiBearerAuth()
    @Post('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
