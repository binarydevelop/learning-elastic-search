import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.setGlobalPrefix('/api/v1');
  app.use(compression());
  app.use(
    session({
      secret: 'plk23tu9765-session',
      resave: false,
      saveUninitialized: false,
    }),
  );
}
bootstrap();
