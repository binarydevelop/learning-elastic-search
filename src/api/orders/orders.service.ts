import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersRepository } from './orders.repository';
import { orders } from './entites/order.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersRepository)
        private ordersRepository: OrdersRepository,
        private eventEmitter: EventEmitter2
        ) { }
    /**
     * 
     * @param createOrderDto
     * @description Create order
     * @returns boolean
     */
    async createOrder(createOrderDto: CreateOrderDto) {
        await getManager().transaction(async transactionalEntityManager => {
            return await this.ordersRepository.createOrder(createOrderDto, transactionalEntityManager);
        })
        const orderCreatedEvent = new OrderCreatedEvent();
        orderCreatedEvent.name = "Created";
        orderCreatedEvent.description = "Order was successfully created.";
        this.eventEmitter.emit('order.created', orderCreatedEvent)
    }

    /**
     * 
     * @param id
     * @description Fetch an order by Id
     * @returns order
     */
    async getOrderById(id: string) {
        const order = await this.ordersRepository.getOrderById(id);
        return order;
    }
}