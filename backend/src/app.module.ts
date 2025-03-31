import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Log } from './entities/log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE || 'postgres') as any,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'kair',  // fallback 'kair'
      entities: [User, Role, Log],
      synchronize: true,  // Временно включаем синхронизацию для создания таблицы logs
      migrations: ['src/migrations/*.ts'],
      migrationsRun: false,
    }),
    TypeOrmModule.forFeature([User, Role, Log]),  // ✅ Теперь Log включен в TypeOrmModule.forFeature
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
