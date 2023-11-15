import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { NotFoundException } from '@nestjs/common';
import { CatEntity } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsModule } from './cats.module';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

/*
Mock 객체는 언제 필요한가? #
- 테스트 작성을 위한 환경 구축이 어려운 경우
- 환경 구축을 위한 작업 시간이 많이 필요한 경우에 Mock객체를 사용한다. (데이터베이스, 웹서버, 웹애플리케이션서버, FTP서버, 등)
  특정 모듈을 갖고 있지 않아서 테스트 환경을 구축하지 못할 때 또는 타 부서와의 협의나 정책이 필요한 경우에 사용한다. 
*/

const mockcatRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CatsService', () => {
  let service: CatsService;
  let catRepository: MockRepository<CatEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(CatEntity),
          useValue: mockcatRepository(),
        },],

    }).compile();
    service = module.get<CatsService>(CatsService);
    catRepository = module.get<MockRepository<CatEntity>>(
      getRepositoryToken(CatEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //=======================
  //======== CREATE =======
  //=======================
  describe('create()', () => {
    const createArgs: CreateCatDto = {
      name: 'Test cat',
      age: 2000,
      createdAt: new Date(Date.parse("2023-01-01")),
    };

    it('should create Cats', async () => {
      catRepository.save.mockResolvedValue(createArgs);
      const result = await service.create(createArgs);

      expect(catRepository.save).toHaveBeenCalledTimes(1);
      expect(catRepository.save).toHaveBeenCalledWith(createArgs);

      expect(result).toEqual(createArgs);
    });

    it('should fail on exception', async () => {
      catRepository.save.mockRejectedValue(new Error('save error'));
      try {
        const result = await service.create(createArgs);
      } catch (error) {
        expect(error.message).toEqual('save error');
      }
    });
  });

  //=======================
  //======== FIND  ========
  //=======================
  describe('findAll()', () => {
    it('should be find All', async () => {
      catRepository.find.mockResolvedValue([]);
      const result = await service.findAll();
      expect(catRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
    it('should fail on exception', async () => {
      catRepository.find.mockRejectedValue(new Error('findAll error'));
      try {
        const result = await service.findAll()
      } catch (error) {
        expect(error.message).toEqual('findAll error');
      }
    });
  });

  describe('findOne()', () => {
    const findOneArgs = { id: 1 };

    it('should be findOne', async () => {
      const catPost = {
        "name": "joo11a",
        "age": 5,
        "createdAt": "2020-06-24T15:00:00.000Z",
        "updatedAt": null,
        "deletedAt": null,
        "id": 1
      };
      catRepository.findOne.mockResolvedValue(catPost);
      const result = await service.findOne(findOneArgs.id);
      expect(catRepository.findOne).toHaveBeenCalledTimes(1);//메서드가 한 번 호출되었는지 확인
      expect(catRepository.findOne).toHaveBeenCalledWith({ "where": { "id": 1 } });//메서드가 예상되는 인수로 호출되었는지 확인
      expect(result).toEqual(catPost);
    });

    it('should fail if no cat is found', async () => {
      catRepository.findOne.mockResolvedValue(null);
      try {
        const result = await service.findOne(findOneArgs.id);

        expect(catRepository.findOne).toHaveBeenCalledTimes(1);
        expect(catRepository.findOne).toHaveBeenCalledWith({ "where": { "id": 1 } });
      } catch (error) {
        expect(error.message).toEqual(new EntityNotFoundError(CatEntity, findOneArgs.id));
      }
    });
    it('should fail on findOne exception', async () => {
      catRepository.findOne.mockRejectedValue(new Error('findOne error'));
      try {
        const result = await service.findOne(findOneArgs.id);
      } catch (error) {
        expect(error.message).toEqual('findOne error');
      }
    });
  });

  //=======================
  //======== UPDATE =======
  //=======================
  describe('update()', () => {
    const findOneArgs = { id: 1 };
    const updateArgs = {
      name: 'update',
      age: 111,
    };

    it('should be update cat', async () => {
      const oldPosts = {
        id: 1,
        name: 'hello',
        age: 1,
      };
      const newPosts = {
        id: 1,
        name: 'hello wold',
        age: 1000,
      };

      catRepository.findOne.mockResolvedValue(oldPosts);
      catRepository.save.mockResolvedValue(newPosts);

      const result = await service.update(findOneArgs.id, updateArgs);

      expect(catRepository.findOne).toHaveBeenCalledTimes(1);
      expect(catRepository.findOne).toHaveBeenCalledWith({ "where": { "id": 1 } });

      expect(catRepository.save).toHaveBeenCalledTimes(1);
      expect(catRepository.save).toHaveBeenCalledWith({
        ...oldPosts,
        ...updateArgs,
      });

      expect(result).toEqual(newPosts);

    });
    it('should fail if no cat is found', async () => {
      catRepository.findOne.mockResolvedValue(null);
      try {
        const result = await service.findOne(findOneArgs.id);

        expect(catRepository.findOne).toHaveBeenCalledTimes(1);
        expect(catRepository.findOne).toHaveBeenCalledWith({ "where": { "id": 1 } });
      } catch (error) {
        expect(error.message).toEqual(new EntityNotFoundError(CatEntity, findOneArgs.id));
      }

    });
    it('should fail on findOne exception', async () => {
      catRepository.findOne.mockRejectedValue(new Error('findOne error'));
      try {
        const result = await service.findOne(findOneArgs.id);
      } catch (error) {
        expect(error.message).toEqual('findOne error');
      }
    });
    it('should fail on save exception', async () => {
      catRepository.save.mockResolvedValue(new Error('save error'));
      try {
        const result = await service.update(findOneArgs.id, updateArgs);
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          expect(error.message).toEqual('Could not find any entity of type "CatEntity" matching: 1');
        } else {
          expect(error.message).toEqual('save error');
        }
      }
    });

    //=======================
    //======== REMOVE =======
    //=======================
    describe('remove()', () => {
      const removeArgs = 1;
      const cat1 = {
        "name": "joo11a",
        "age": 5,
        "createdAt": "2020-06-24T15:00:00.000Z",
        "updatedAt": null,
        "deletedAt": null,
        "id": 1
      };
      const cat2 = {
        "name": "joo11a",
        "age": 5,
        "createdAt": "2020-06-24T15:00:00.000Z",
        "updatedAt": null,
        "deletedAt": null,
        "id": 1
      };

      it('should be remove post', async () => {
        catRepository.findOne.mockResolvedValue(cat1);
        catRepository.softDelete.mockResolvedValue(cat2);

        await service.remove(removeArgs);

        expect(catRepository.findOne).toHaveBeenCalledTimes(1);
        expect(catRepository.findOne).toHaveBeenCalledWith({ where: { id: removeArgs } });

        expect(catRepository.softDelete).toHaveBeenCalledTimes(1);
        expect(catRepository.softDelete).toHaveBeenCalledWith({ id: removeArgs });
      });


      it('should fail if no cat is found', async () => {
        catRepository.findOne.mockResolvedValue(null);
        try {
          await service.remove(removeArgs);

          expect(catRepository.findOne).toHaveBeenCalledTimes(1);
          expect(catRepository.findOne).toHaveBeenCalledWith({ where: { id: removeArgs } });
        } catch (error) {
          expect(error.message).toEqual('Could not find any entity of type "CatEntity" matching: 1');
        }
      });

      it('should fail on findOne exception', async () => {
        catRepository.findOne.mockRejectedValue(new Error('find error'));
        try {
          const result = await service.findOne(removeArgs);
        } catch (error) {
          expect(error.message).toEqual('find error');
        }

      });
      it('should fail on remove exception', async () => {
        catRepository.findOne.mockRejectedValue(new Error('remove error'));
        try {
          const result = await service.findOne(removeArgs);
        } catch (error) {
          expect(error.message).toEqual('remove error');
        }
      });
    });
  });

});
