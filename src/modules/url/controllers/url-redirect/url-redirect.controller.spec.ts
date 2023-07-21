import { Test, TestingModule } from '@nestjs/testing';
import { UrlRedirectController } from './url-redirect.controller';
import { UrlService } from '../../url.service';
import { UrlRepo } from '../../repositories/url.repo';

const urlService = {
  generateShortUrl: jest.fn(),
  getIfExists: jest.fn(),
  findUrl: jest.fn(),
};

const urlRepo = {
  saveUrl: jest.fn().mockResolvedValue({
    longUrl: 'https://google.com',
    hash: 'hash',
  }),
};

describe('UrlRedirectController', () => {
  let controller: UrlRedirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlRedirectController],
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

    controller = module.get<UrlRedirectController>(UrlRedirectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
