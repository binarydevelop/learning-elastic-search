import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersRepository } from './dto/orders.repository';
import { orders } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersRepository)
        private ordersRepository: OrdersRepository
        ) { }

    async createOrder(createOrderDto: CreateOrderDto) {
        await getManager().transaction(async transactionalEntityManager => {
            await this.ordersRepository.createOrder(createOrderDto);
        })
    }
}