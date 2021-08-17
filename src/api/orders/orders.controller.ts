import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrdersService) {}
    @Post('')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        await this.ordersService.createOrder(createOrderDto);
    }
}
