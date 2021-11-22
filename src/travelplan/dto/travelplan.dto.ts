import { Prop, Schema } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class TravelPlanPayloadDto{
    @IsString()
    @IsNotEmpty()
    userName: string
    @IsString()
    @IsNotEmpty()
    planName: string
    @IsArray()
    @IsNotEmpty()
    locations: number[]
    @IsString()
    description: string
}