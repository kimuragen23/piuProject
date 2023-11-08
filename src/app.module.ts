import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cats/entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'cat_db',
      entities: [CatEntity],
      synchronize: true,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
