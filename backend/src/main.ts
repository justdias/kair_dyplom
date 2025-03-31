import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source'; // Путь к твоему data-source.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Разрешаем запросы с фронтенда (React)
  app.enableCors();

  // Инициализация подключения к базе данных
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('KAIR API')
    .setDescription('Документация API проекта KAIR')
    .setVersion('1.0')
    .addBearerAuth()  // Добавляем JWT авторизацию в документацию
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001); // Порт, на котором работает приложение
}

bootstrap();
