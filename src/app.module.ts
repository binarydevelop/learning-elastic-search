import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './api/orders/orders.module';
import { SearchModule } from './search/search.module';

@Module({
  imports:
  [ 
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    OrdersModule,
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot(),
    SearchModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
