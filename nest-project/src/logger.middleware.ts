import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const clientIp = req.headers['x-forwarded-for'] || req.ip;
        console.log(`IP: ${clientIp}`);
        next();
    }
}
