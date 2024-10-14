import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Writable } from 'stream';
import { Express } from 'express';
import { join } from 'path';

@Injectable()
export class FileUploadService {
    async uploadFile(file: Express.Multer.File): Promise<void> {
        const outputFilePath = join(__dirname, '..', 'uploads', file.originalname);
        const writeStream = createWriteStream(outputFilePath);

        const userWriteStream = new Writable({
            objectMode: true,
            write(chunk, encoding, callback) {
                console.log("Writing User:", chunk);

                writeStream.write(JSON.stringify(chunk) + "\n", encoding, callback);
            },
            final(callback) {
                console.log("All users have been written to the file.");
                writeStream.end();
                callback();
            }
        });

        writeStream.pipe(userWriteStream) //TODO тут с ретурном не работает
    }
}
