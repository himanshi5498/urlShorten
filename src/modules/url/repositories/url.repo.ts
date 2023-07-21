import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from '../schema/url.schema';
import { Model } from 'mongoose';
import { IUrlObject } from '../interfaces/url.response';

@Injectable()
export class UrlRepo {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  public async saveUrl(urlObject: IUrlObject): Promise<UrlDocument> {
    const urlDoc = new this.urlModel(urlObject);
    return await urlDoc.save();
  }

  public async findUrlWithHash(hash: string): Promise<UrlDocument> {
    return await this.urlModel.findOne({
      hash,
    });
  }

  public async findUrl(longUrl: string): Promise<UrlDocument> {
    return await this.urlModel.findOne({
      longUrl,
    });
  }
}
