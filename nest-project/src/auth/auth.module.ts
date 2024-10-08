import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {UsersService} from "../users/users.service";
import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategy";

@Module({
    imports: [JwtModule.register({}), ConfigModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        UsersService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
    ],
})
export class AuthModule {
}
