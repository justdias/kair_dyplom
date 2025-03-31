import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Log } from './entities/log.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password', // Замените на свой пароль
  database: 'kair',
  entities: [User, Role, Log],
  synchronize: true,  // Включаем автоматическое обновление схемы базы данных
  migrations: ['src/migrations/*.ts'], // Путь к миграциям, если всё же нужно
});
