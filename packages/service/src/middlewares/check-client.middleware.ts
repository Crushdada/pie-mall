import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class checkClientMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const ori = req.get('origin');
    if (ori === process.env.PIEMALL_APP_Ori) {
      req.session.client = process.env.PIEMALL_APP;
    }
    if (ori === process.env.PIEMALL_ADMIN_Ori) {
      req.session.client = process.env.PIEMALL_ADMIN;
    }
    next();
  }
}
