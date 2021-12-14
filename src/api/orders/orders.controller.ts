import { Body, Controller, Get, Param, Post, Render, Req, Res, Session, Sse, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { request } from 'express';
import { Response } from 'express';
import { interval, map, Observable } from 'rxjs';
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
    @Render('get-order')
    async getOrderById(@Param('id') id: string, @Session() session: Record<string, any>, @Res() res: Response) {
        const order = await this.ordersService.getOrderById(id);
        return {order}
    }

    @Get('get-all/:id')
    async getAllOrders(@Req() req, @Param('id') id: string) {
        const orders = await this.ordersService.getAllOrders(req, id);
        return [{
            success: true,
            orders
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

  @Get('mvc/index')
  @Render('index')
  root() {
    return { message: 'HandleBars' };
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
      return interval(1000).pipe(
        map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
      );
  }
}
