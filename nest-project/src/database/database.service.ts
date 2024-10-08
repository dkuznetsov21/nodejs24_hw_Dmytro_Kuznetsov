import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    async onModuleInit() {
        this.connection.once('open', () => {
            console.log('Successfully connected to MongoDB');
        });

        this.connection.on('error', (err) => {
            console.error('Failed to connect to MongoDB', err);
        });

        if (this.connection.readyState === 1) {
            console.log('MongoDB connection already established');
        }
    }
}
