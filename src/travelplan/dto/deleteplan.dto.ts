import { IsNotEmpty, IsNumber } from "class-validator";

export class DeletePlanPayloadDto{
    @IsNumber()
    @IsNotEmpty()
    userId: number
}