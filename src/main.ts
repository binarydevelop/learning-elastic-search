import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication> (
    AppModule
  )
  app.setGlobalPrefix('/api/v1');
  app.use(compression());
  /* The public directory will be used for storing static assets, views will contain templates,
     and the hbs template engine should be used to render HTML output.
 */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);

}
bootstrap();
