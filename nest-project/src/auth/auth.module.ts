import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {UsersService} from "../users/users.service";
import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategy";
import {DatabaseAbstractionModule} from "../database-abstraction/database-abstraction.module";
import {DBType} from "../database-abstraction/types/enums/database-type.enum";

@Module({
    imports: [JwtModule.register({}), ConfigModule, DatabaseAbstractionModule.register(DBType.MONGODB),],
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
