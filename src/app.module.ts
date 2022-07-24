import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AwsModule } from './aws/aws.module';
import { RawBodyMiddleware } from './middleware/body-parser.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AwsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes('*');
  }
}
