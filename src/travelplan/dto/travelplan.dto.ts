import { Prop, Schema } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";

interface Plan {
    id: ObjectId;
    locationId: number[];
}

export class TravelPlanPayloadDto{
    @IsNumber()
    @IsNotEmpty()
    userId: number
    @IsString()
    @IsNotEmpty()
    planName: string
    @IsArray()
    @IsNotEmpty()
    plan: Plan[]
    @IsString()
    description: string
}