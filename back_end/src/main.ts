import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Importación necesaria
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('EVM Trycore API')
    .setDescription('Prueba Técnica: Sistema de Valor Ganado')
    .setVersion('1.0')
    .addTag('proyectos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();