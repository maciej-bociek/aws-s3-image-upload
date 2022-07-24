import { Controller, Post, Param, Body } from '@nestjs/common';
import { AwsService } from './aws.service';

import { ValidationPipe } from 'src/pipes/size-validation.pipe';

@Controller()
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post(':fileName')
  async uploadImage(
    @Param() param: { fileName: string },
    @Body(new ValidationPipe()) body: Buffer,
  ): Promise<string> {
    const resp = await this.awsService.upload(body, param.fileName);

    return resp.Location;
  }
}
