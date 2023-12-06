import { Test, TestingModule } from '@nestjs/testing';
import { AccountinfoController } from './accountinfo.controller';
import { AccountinfoService } from './accountinfo.service';

describe('AccountinfoController', () => {
  let controller: AccountinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountinfoController],
      providers: [AccountinfoService],
    }).compile();

    controller = module.get<AccountinfoController>(AccountinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
