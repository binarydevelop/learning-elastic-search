import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository, } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersRepository } from './orders.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './events/order-created.event';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersRepository)
        private ordersRepository: OrdersRepository,
        private eventEmitter: EventEmitter2,
        private httpService: HttpService
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

    /**
     * 
     * @param request
     * @description Fetch all orders 
     * @returns order
     */
    async getAllOrders(req: any, id?: string, ) {console.log(req.params)
        if(req.params.id) { 
            return this.httpService.get(`http://localhost:3000/orders/${id}`);
        } else {
            return this.ordersRepository.find();
        }
    }

}