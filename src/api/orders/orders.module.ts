import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderCreatedListener } from './listeners/order-created.listener';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature(
    [OrdersRepository]
  )],
  controllers: [OrdersController],
  providers: [
    OrdersService, 
    OrderCreatedListener
  ]
})
export class OrdersModule {}
