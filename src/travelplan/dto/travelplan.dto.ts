import { Prop, Schema } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { Type } from "class-transformer";

export class TravelPlanPayloadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  planName: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  locations: number[];

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;
}
