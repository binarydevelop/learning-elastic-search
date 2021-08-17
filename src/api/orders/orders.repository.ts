import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { TransactionEntityMetadataArgs } from "typeorm/metadata-args/TransactionEntityMetadataArgs";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { orders } from "./entites/order.entity";

@EntityRepository(orders)
export class OrdersRepository extends Repository<orders> {

    async createOrder(
        createOrderDto: CreateOrderDto,
        transactionalEntityManager
        ) {
        try{
            const { title, description} = createOrderDto;
            const newOrder = this.create({
                title,
                description
            })
            if(transactionalEntityManager != undefined){
                return await transactionalEntityManager.save(newOrder);
            } else {
                return await this.save(newOrder);
            }
        }
        catch(error) {
            console.log(error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOrderById(
        id: string
        ) {
            try{
                const result = await this.createQueryBuilder('order')
                          .where('order.id = :id', {id})
                          .getOne()
                return result;
            }
            catch(error) {
                console.log(error)
            }
        }
}