import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url-shortener.controller';
import { plainToClass } from 'class-transformer';
import { UrlRepo } from '../../repositories/url.repo';
import { UrlService } from '../../url.service';
import { UrlDTO } from '../../dto/url.dto';

const urlService = {
  generateShortUrl: jest.fn(),
  getIfExists: jest.fn(),
  isValidHash: jest.fn(),
  findUrl: jest.fn(),
};

const urlRepo = {
  saveUrl: jest.fn().mockResolvedValue({
    longUrl: 'https://google.com',
    hash: 'hash',
  }),
};

describe('UrlShortenerController', () => {
  let controller: UrlShortenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortenerController],
      providers: [
        {
          provide: UrlService,
          useValue: urlService,
        },
        {
          provide: UrlRepo,
          useValue: urlRepo,
        },
      ],
    }).compile();

    controller = module.get<UrlShortenerController>(UrlShortenerController);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('must create a tiny url for a given long url', async () => {
    const longUrl = 'https://example.com';
    urlService.generateShortUrl.mockResolvedValueOnce({
      url: longUrl,
      shortUrl: '1234567',
      urlHash: 'hash',
    });

    const payload = {
      url: longUrl,
    };

    const response = await controller.createShortUrl(
      plainToClass(UrlDTO, payload),
    );

    expect(response).toBeDefined();
    expect(response.shortUrl).toBeDefined();
    expect(response.url).toBeDefined();
    expect(response.urlHash).toBeDefined();
  });

  it('must return same tiny url, for same long url', async () => {
    const longUrl = 'https://example.com';
    urlService.getIfExists.mockResolvedValueOnce({
      url: longUrl,
      shortUrl: '1234567',
      urlHash: 'hash',
    });

    const payload = {
      url: longUrl,
    };
    const response = await controller.createShortUrl(
      plainToClass(UrlDTO, payload),
    );

    expect(response).toBeDefined();
    expect(response.shortUrl).toBeDefined();
    expect(response.url).toBeDefined();
    expect(response.urlHash).toBeDefined();
  });

  it('must create return exception because it is not found', async () => {
    const longUrl = 'https://example.com';
    urlService.findUrl.mockResolvedValueOnce(null);
    await expect(controller.getLongUrl(longUrl)).rejects.toThrow();
  });

  it('must create return expected response with long url', async () => {
    const longUrl = 'https://example.com';
    urlService.findUrl.mockResolvedValueOnce({
      url: longUrl,
      shortUrl: '1234567',
      urlHash: 'hash',
    });

    const response = await controller.getLongUrl(longUrl);

    expect(response).toBeDefined();
    expect(response.shortUrl).toBeDefined();
    expect(response.url).toBeDefined();
    expect(response.urlHash).toBeDefined();
  });
});
