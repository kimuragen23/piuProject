import { Test, TestingModule } from '@nestjs/testing';
import { OrderstatusController } from './orderstatus.controller';
import { OrderstatusService } from './orderstatus.service';

describe('OrderstatusController', () => {
  let controller: OrderstatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderstatusController],
      providers: [OrderstatusService],
    }).compile();

    controller = module.get<OrderstatusController>(OrderstatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
