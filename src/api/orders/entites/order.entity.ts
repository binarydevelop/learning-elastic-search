import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'orders'})
export class orders {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: "varchar",
        length: 20
    })
    title: string;

    @Column({
        type: "varchar",
        length: 100
    })
    description: string;
}