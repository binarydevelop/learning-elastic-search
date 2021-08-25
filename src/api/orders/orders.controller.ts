import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

    @Post('upload-single-file')
    @UseInterceptors(FileInterceptor('image', { dest: './uploads', preservePath: true}))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const data = Object.assign({
            fileName: file.filename,
            fieldName: file.fieldname,
            fileSize: file.size
        })
        return [{
            success: true,
            data
        }]
    }

    @Post('upload-array-files')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        let Filesdata: any[] = [];
        files.forEach(file => {
            const data = Object.assign({
                fileName: file.filename,
                fieldName: file.fieldname,
                fileSize: file.size
            })
            Filesdata.push(data);
        })
        return [{
            success: true,
            Filesdata
        }]
    }

    @Post('upload-multiple-files')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'field1', maxCount: 1 },
      { name: 'field2', maxCount: 1 },
    ]))
    async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        let Filesdata: any[] = [];
        Array(files).forEach(file => {
            Filesdata.push(file)
        })
        return [{
            success: true,
            Filesdata
        }]
    }
    

}
