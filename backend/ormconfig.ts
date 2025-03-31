import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Role } from './src/entities/role.entity';
import { Log } from './src/entities/log.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'kair',
  entities: [User, Role, Log],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  logging: true,
});
