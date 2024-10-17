import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {storage} from "./storage.config";
import {FileUploadService} from "./file-upload.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('File')
@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {
    }

    @Post('small')
    @UseInterceptors(FileInterceptor('file', {storage}))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return file;
    }

    @Post('large')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 300 * 1024 * 1024
        }
    }))
    async uploadLargeFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileUploadService.uploadLargeFile(file)
    }
}
