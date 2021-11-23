import { Prop, Schema } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { ILocation } from "src/location/interfaces/location.interface";


export class FullTravelPlanPayloadDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userName: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    planName: string
    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    locations: ILocation[]
    @ApiProperty()
    @IsString()
    description: string
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPublic: boolean
}