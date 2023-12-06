import { Test, TestingModule } from '@nestjs/testing';
import { ProductcodeService } from './productcode.service';

describe('ProductcodeService', () => {
  let service: ProductcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductcodeService],
    }).compile();

    service = module.get<ProductcodeService>(ProductcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
