import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LoggerIpMiddleware} from "./common/middlewares/logger-ip.middleware";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerIpMiddleware)
        .forRoutes({path: '/', method: RequestMethod.ALL});
  }
}
