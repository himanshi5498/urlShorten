import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { UrlDTO } from '../../dto/url.dto';
import { UrlService } from '../../url.service';
import { IUrlResponse } from '../../interfaces/url.response';

@Controller('/links')
export class UrlShortenerController {
  constructor(private urlService: UrlService) {}
  /**
   * Checks if the same long url is already present with a short url.
   * If yes, returns the short url for the long url.
   * If not, attempts to accept the short url given by the user.
   */
  @Post('')
  async createShortUrl(
    @Body(new ValidationPipe()) urlDto: UrlDTO,
  ): Promise<IUrlResponse> {
    const { url: longUrl } = urlDto;
    const existingTinyUrl = await this.urlService.getIfExists(longUrl);

    if (existingTinyUrl) {
      return {
        url: longUrl,
        urlHash: existingTinyUrl.urlHash,
        shortUrl: existingTinyUrl.shortUrl,
      };
    }

    const savedUrl: IUrlResponse = await this.urlService.generateShortUrl(
      longUrl,
    );
    return {
      url: savedUrl.url,
      urlHash: savedUrl.urlHash,
      shortUrl: savedUrl.shortUrl,
    };
  }

  @Get('/:urlHash')
  async getLongUrl(@Param('urlHash') urlHash: string): Promise<IUrlResponse> {
    const savedUrl: IUrlResponse = await this.urlService.findUrl(urlHash);
    if (savedUrl) {
      return {
        url: savedUrl.url,
        urlHash,
        shortUrl: savedUrl.shortUrl,
      };
    } else {
      throw new BadRequestException({
        message: 'No record found with the given short url',
      });
    }
  }
}
