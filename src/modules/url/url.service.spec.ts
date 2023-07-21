import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { UrlRepo } from './repositories/url.repo';
const baseUrl = process.env.DEFAULT_URL;

const urlRepo = {
  saveUrl: jest.fn().mockResolvedValue({
    longUrl: 'https://google.com',
    hash: 'hash',
  }),
};

describe('UrlService', () => {
  let service: UrlService;

  urlRepo.saveUrl.mockReset();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UrlRepo,
          useValue: urlRepo,
        },
        UrlService,
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateShortUrl generation', () => {
    it('must generate short url for a given long url', async () => {
      const longUrl = 'https://google.com';
      urlRepo.saveUrl.mockResolvedValueOnce({
        longUrl: longUrl,
        hash: 'hash',
      });

      let savedUrl;
      let err;

      try {
        savedUrl = await service.generateShortUrl(longUrl);
      } catch (e) {
        err = e;
      } finally {
        expect(err).toBeFalsy();
        expect(savedUrl).toBeDefined();
        expect(savedUrl.url).toBeDefined();
        expect(savedUrl.urlHash).toBeDefined();
        expect(savedUrl.shortUrl).toBeDefined();
        expect(savedUrl.shortUrl).toBe(baseUrl + '/hash');
      }
    });
  });
});
