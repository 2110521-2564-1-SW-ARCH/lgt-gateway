import { IsNotEmpty, IsNumber } from "class-validator";

export class TravelPlanPayloadDto{
    @IsNumber()
    @IsNotEmpty()
    userId: number
    @IsNumber()
    @IsNotEmpty()
    locationId: number[]
}