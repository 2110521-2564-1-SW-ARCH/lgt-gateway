import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users} from "./models/user.entity";
import { EntityNotFoundError } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

var _ = require('lodash');

@Injectable()
export class UserService {
    async create(createUserDto: CreateUserDto) {
        const user = Users.create(createUserDto);
        await user.save();
    
        delete user.password;
        return user;
      }

      async findByUserName(userName: string) {
        return await Users.findOne({
          where: {
            userName: userName,
          },
        });
      }
    
}