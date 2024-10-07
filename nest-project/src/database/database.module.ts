import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL)
    ],
    providers: [DatabaseService],
})
export class DatabaseModule {}
