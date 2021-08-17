import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './dto/orders.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
    [OrdersRepository]
  )],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
