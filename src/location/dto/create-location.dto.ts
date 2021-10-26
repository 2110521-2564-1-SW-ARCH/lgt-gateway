import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subDistrict: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postCode: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  province: string

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  latitude: string

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  longitude: string

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  imgURL: string

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  closestStation: number
}
