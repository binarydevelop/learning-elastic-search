import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './api/orders/orders.module';

@Module({
  imports:
  [
    OrdersModule,
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
