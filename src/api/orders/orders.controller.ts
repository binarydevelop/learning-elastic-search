import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService:OrdersService,
        private eventEmitter: EventEmitter2
        ) {}
        
    @Post('')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const data = await this.ordersService.createOrder(createOrderDto);
        return [{
            success: true,
            data
        }]
    }

    @Get('/:id')
    async getOrderById(@Param('id') id: string) {
        const order = await this.ordersService.getOrderById(id);
        return [{
            success: true,
            order
        }]
    }

    @Post('upload-file')
    @UseInterceptors(FilesInterceptor('imagw', undefined, {dest: './uploads', preservePath: true}))
    async uploadedFile(@UploadedFiles() file: Express.Multer.File) {
        console.log(file);
}
}
