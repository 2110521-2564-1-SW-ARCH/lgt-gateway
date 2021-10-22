import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('api/user')
export class UserController {
    constructor(private usersService: UserService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/create-user')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}