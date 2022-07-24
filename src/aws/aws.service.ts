import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { s3ImageDimension } from 'src/config/config';
import * as sharp from 'sharp';

@Injectable()
export class AwsService {
  async upload(file: Buffer, fileName: string) {
    const s3 = this.getS3();

    const image: Buffer = await sharp(file)
      .resize({
        width: s3ImageDimension,
        height: s3ImageDimension,
      })
      .toBuffer();

    const params: PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: image,
      Key: fileName,
    };

    return s3.upload(params).promise();
  }

  getS3() {
    return new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
  }
}
