import { Injectable } from '@nestjs/common';
import { CreateAccountinfoDto } from './dto/create-accountinfo.dto';
import { UpdateAccountinfoDto } from './dto/update-accountinfo.dto';
import { Accountinfo } from './entities/accountinfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountinfoService {
  constructor(@InjectRepository(Accountinfo)
  private accountInfoRepository: Repository<Accountinfo>) { }

  async find(): Promise<Accountinfo> {
    try {
      return await this.accountInfoRepository.findOne({
        where: {
          accountinfo_id: 1
        }
      });
      //select * from cat where 
    } catch (error) {
      throw error
    }
  }
}
