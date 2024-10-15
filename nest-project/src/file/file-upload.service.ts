import {HttpException, HttpStatus, Injectable, UploadedFile} from '@nestjs/common';
import * as fs from "fs";

@Injectable()
export class FileUploadService {
    async uploadLargeFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('File is require', HttpStatus.BAD_REQUEST)
        }

        const uploadDir = './uploads'
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir)
        }

        const filePath = `${uploadDir}/${Date.now()}-${file.originalname}`

        try {
            const writeStream = fs.createWriteStream(filePath)

            writeStream.write(file.buffer, () => {
                return writeStream.end();
            })

            return new Promise((resolve, reject) => {
                console.log('File upload successfully');

                resolve({message: 'File upload successfully', path: filePath});

                writeStream.on('error', (err) => {
                    reject(new HttpException(
                        `Upload failed: ${err.message}`,
                        HttpStatus.INTERNAL_SERVER_ERROR))
                })
            })
        } catch (err) {
            console.log(err)

            throw new HttpException(
                `Error uploading file: ${err.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
