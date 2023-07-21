import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlShortenerController } from './controllers/url-shortener/url-shortener.controller';
import { UrlRedirectController } from './controllers/url-redirect/url-redirect.controller';
import { UrlRepo } from './repositories/url.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schema/url.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
  ],
  controllers: [UrlShortenerController, UrlRedirectController],
  providers: [UrlRepo, UrlService],
})
export class URLModule {}
