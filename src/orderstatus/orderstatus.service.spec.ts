import { Test, TestingModule } from '@nestjs/testing';
import { OrderstatusService } from './orderstatus.service';

describe('OrderstatusService', () => {
  let service: OrderstatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderstatusService],
    }).compile();

    service = module.get<OrderstatusService>(OrderstatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
