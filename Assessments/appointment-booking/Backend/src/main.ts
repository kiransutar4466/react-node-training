import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist:true,
    forbidNonWhitelisted:true,
  }))
  app.enableCors({
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*',  
  });
  
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Online Consultation Booking System')
  .setDescription('Healthcare')
  .setVersion('1.0')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,documentFactory); 

  await app.listen(process.env.PORT ?? 4000);  
}
bootstrap();     