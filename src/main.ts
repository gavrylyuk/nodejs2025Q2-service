import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Swagger / OpenAPI setup (code-first)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(
      'In-memory service for Users, Artists, Albums, Tracks and Favorites',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);
  // Persist generated spec to doc/api.yaml for external tooling
  try {
    const outputDir = path.resolve(process.cwd(), 'doc');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(outputDir, 'api.yaml'),
      yaml.stringify(document),
      'utf8',
    );
  } catch (err) {
    // Non-fatal: log to console only
    // eslint-disable-next-line no-console
    console.error('Failed to write OpenAPI file:', err);
  }
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
}
bootstrap();
