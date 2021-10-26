import { Prop, Schema } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { ObjectId } from "mongoose";

interface Plan {
    id: ObjectId;
    locationId: number[];
}

export class TravelPlanPayloadDto{
    @IsNumber()
    @IsNotEmpty()
    userId: number
    @IsArray()
    @IsNotEmpty()
    plan: Plan[]
}