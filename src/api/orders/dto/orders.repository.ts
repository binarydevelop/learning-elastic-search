import { EntityRepository, Repository } from "typeorm";
import { orders } from "../order.entity";

@EntityRepository(orders)
export class OrdersRepository extends Repository<orders> {

    async createOrder(createOrderDto) {
        const { title, description} = createOrderDto;
        const newOrder = await this.create({
            title,
            description
        })
        await this.save(newOrder);
    }
}