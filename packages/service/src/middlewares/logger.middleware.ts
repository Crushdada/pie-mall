import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Request } from 'express';
import * as chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // const userId = (req['session'] || {}).userId;
        let log = '';
        // IP info
        let ip;
        try {
            ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        } catch (err) { }
        if (ip) log += chalk.yellow(`[${ip}]`);

        // User Info
        // if (userId) log += `[${chalk.italic.green(userId)}]`;
        // else log += `[${chalk.red('Not Logined')}]`;

        // Method
        const method = req.method;
        if (method.toUpperCase() === 'GET') log += chalk.green(`[${method}]`);
        else if (method.toUpperCase() === 'POST')
            log += chalk.yellow(`[${method}]`);
        else if (method.toUpperCase() === 'DELETE') log += chalk.red(`[${method}]`);
        else log += chalk.cyan(`[${method}]`);

        // path
        log += `:${req.originalUrl}`;
        console.log(log);
        next();
    }
}
