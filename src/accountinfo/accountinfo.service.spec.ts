import { Test, TestingModule } from '@nestjs/testing';
import { AccountinfoService } from './accountinfo.service';

describe('AccountinfoService', () => {
  let service: AccountinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountinfoService],
    }).compile();

    service = module.get<AccountinfoService>(AccountinfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
