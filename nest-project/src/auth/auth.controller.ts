import {Controller, Post, Body, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignUpUserInputDto } from './dto/sign-up-user-input.dto';
import {SignInUserInputDto} from "./dto/sign-in-user-input.dto";
import {AccessTokenGuard} from "../guargs/access-token.guard";
import {RefreshTokenGuard} from "../guargs/refresh-token.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() signUpUserDto: SignUpUserInputDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInUserInputDto) {
    return this.authService.signIn(signInUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
