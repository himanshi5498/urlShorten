import { BadRequestException, Injectable } from '@nestjs/common';
import { IUrlResponse } from './interfaces/url.response';
import { UrlRepo } from './repositories/url.repo';
const short = require('short-uuid');

@Injectable()
export class UrlService {
  constructor(private urlRepository: UrlRepo) {}
  private readonly baseUrl = process.env.DEFAULT_URL;
  async findUrl(urlHash: string): Promise<IUrlResponse | null> {
    if (!this.isValidHash(urlHash)) {
      throw new BadRequestException({
        message: 'Bad Request. Specify a valid short url',
      });
    }

    const savedUrl = await this.urlRepository.findUrlWithHash(urlHash);
    return savedUrl
      ? {
          url: savedUrl.longUrl,
          urlHash: savedUrl.hash,
          shortUrl: `${this.baseUrl}/${savedUrl.hash}`,
        }
      : null;
  }

  isValidHash(urlHash: string): boolean {
    return Object.prototype.toString.call(urlHash) === '[object String]';
  }

  async getIfExists(longUrl: string): Promise<IUrlResponse | null> {
    const existingUrlDoc = await this.urlRepository.findUrl(longUrl);
    return existingUrlDoc
      ? {
          url: existingUrlDoc.longUrl,
          urlHash: existingUrlDoc.hash,
          shortUrl: `${this.baseUrl}/${existingUrlDoc.hash}`,
        }
      : null;
  }

  async generateShortUrl(longUrl: string): Promise<IUrlResponse> {
    const hash = short.generate();
    const savedUrl = await this.urlRepository.saveUrl({
      longUrl,
      hash,
    });
    return {
      url: savedUrl.longUrl,
      urlHash: savedUrl.hash,
      shortUrl: `${this.baseUrl}/${savedUrl.hash}`,
    };
  }
}
