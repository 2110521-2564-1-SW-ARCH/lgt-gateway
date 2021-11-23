import { Prop, Schema } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { ILocation } from "src/location/interfaces/location.interface";


export class FullTravelPlanPayloadDto{
    @IsString()
    @IsNotEmpty()
    userName: string
    @IsString()
    @IsNotEmpty()
    planName: string
    @IsArray()
    @IsNotEmpty()
    locations: ILocation[]
    @IsString()
    description: string
}