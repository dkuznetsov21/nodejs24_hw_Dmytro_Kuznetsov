import {diskStorage} from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export const storage = diskStorage({
    destination: (req, file, callback) => {
        const uploadsDir = path.join(__dirname, '..', 'uploads');

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        callback(null, uploadsDir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
})
