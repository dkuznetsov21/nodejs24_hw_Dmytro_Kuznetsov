import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import {storage} from "./storage.config";

@Controller('file-upload')
export class FileUploadController {
    @Post('')
    @UseInterceptors(FileInterceptor('file', {storage}))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const filePath = path.join(__dirname, '..', 'uploads', file.originalname);

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(filePath);

        readStream.on('data', (chunk) => {
            writeStream.write(chunk);
        });

        await new Promise((resolve, reject) => {
            readStream.on('end', () => {
                writeStream.end();
                resolve(null);
            });
            readStream.on('error', reject);
            writeStream.on('error', reject);
        });
    }
}
