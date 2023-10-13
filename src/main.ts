import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['debug', 'error', 'verbose', 'warn'],
  });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Moonshot')
    .setDescription('Moonshot')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.get('isProd'),
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', /localhost/, /vercel.app/],
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'HEAD',
      'PATH',
      'OPTIONS',
    ],
    credentials: true,
  });

  await app.listen(3000);

  console.log('App is listening on 3000');
}
bootstrap();
