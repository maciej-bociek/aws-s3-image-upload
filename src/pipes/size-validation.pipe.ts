import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import sizeOf = require('buffer-image-size');
import { fromBuffer } from 'file-type';
import { allowedMimeTypes, maxDimension } from 'src/config/config';
import { checkMaxImageDimensions } from 'src/utils/check-max-image-dimensions';
import { checkMimeType } from 'src/utils/check-mime-type';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: Buffer) {
    const type = await fromBuffer(value);
    if (!checkMimeType(allowedMimeTypes, type.mime)) {
      throw new HttpException(`Unsupported file type`, HttpStatus.BAD_REQUEST);
    }

    const imageDimensions = sizeOf(value);
    if (checkMaxImageDimensions(imageDimensions, maxDimension)) {
      throw new HttpException(
        `Image size to much. Max width and height is 2048px`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
