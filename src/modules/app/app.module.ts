import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { URLModule } from '../url/url.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    URLModule,
    MongooseModule.forRoot(`${process.env.MONGO_DB_URL}/test`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
