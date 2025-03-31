import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Log } from '../entities/log.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    
  ],
})
export class DatabaseModule {
    static dataSource: DataSource;
  
    constructor() {
      DatabaseModule.dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'your_password',
        database: 'kair',
        entities: [User, Role, Log],
        synchronize: false,
      });
    }
  }