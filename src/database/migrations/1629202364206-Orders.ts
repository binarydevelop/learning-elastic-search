import { isNumber } from "class-validator";
import { title } from "process";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Orders1629202364206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                    generationStrategy: 'uuid',             
                    default: `uuid_generate_v4()`
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
