import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  longUrl: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  hash: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
