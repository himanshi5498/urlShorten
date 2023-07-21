import {
  IsDefined,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UrlDTO {
  @IsDefined()
  @IsUrl({
    allow_underscores: true,
  })
  url: string;
}
