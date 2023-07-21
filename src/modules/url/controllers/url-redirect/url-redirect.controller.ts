import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from '../../url.service';
import { IUrlResponse } from '../../interfaces/url.response';

@Controller('')
export class UrlRedirectController {
  constructor(private urlService: UrlService) {}

  @Get('/:urlHash')
  @HttpCode(HttpStatus.FOUND)
  async redirectToUrl(
    @Param('urlHash') urlHash: string,
    @Res() response: Response,
  ) {
    const savedUrl: IUrlResponse = await this.urlService.findUrl(urlHash);
    let redirectUrl = process.env.DEFAULT_URL;
    if (savedUrl) {
      redirectUrl = savedUrl.url;
    }
    response.redirect(redirectUrl);
    //  {
    //   url: redirectUrl,
    // };
  }
}
