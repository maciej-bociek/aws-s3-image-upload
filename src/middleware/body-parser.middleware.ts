import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, raw } from 'express';
import { allowedMimeTypes, limit } from 'src/config/config';
import { checkMimeType } from 'src/utils/check-mime-type';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any): any {
    const contentType = req.header('Content-Type');

    if (checkMimeType(allowedMimeTypes, contentType)) {
      raw({
        limit,
        type: 'image/*',
      })(req, res, next);
    } else {
      throw new HttpException(
        `Unsupported content type`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
