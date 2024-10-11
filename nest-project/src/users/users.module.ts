import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {DatabaseAbstractionModule} from "../database-abstraction/database-abstraction.module";
import {DBType} from "../database-abstraction/types/enums/database-type.enum";

@Module({
  imports: [DatabaseAbstractionModule.register(DBType.MONGODB)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
