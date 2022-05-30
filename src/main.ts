import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
export const SERVER_PORT = process.env.SERVER_PORT || '8080';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(+SERVER_PORT);
}
bootstrap();
