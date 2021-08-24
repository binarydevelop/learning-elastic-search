import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './api/orders/orders.module';

@Module({
  imports:
  [ MulterModule.register({
      dest: './uploads',
    }),
    OrdersModule,
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
