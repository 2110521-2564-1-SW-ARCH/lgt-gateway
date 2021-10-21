import { IsDate ,IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty()
  birthdate: Date;
}