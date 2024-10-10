import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar o CORS para permitir Hoppscotch
  app.enableCors({
    origin: ['typebot.startedbot.com.br'], // Permite requisições somente desta URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir cookies, se necessário
  });

  await app.listen(3000);
}
bootstrap();
