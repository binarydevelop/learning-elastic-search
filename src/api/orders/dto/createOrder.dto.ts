import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string
}