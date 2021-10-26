import { Injectable } from "@nestjs/common";
import { Users } from "../user/models/user.entity";

var _ = require('lodash');

@Injectable()
export class TravelPlanService {
  async findByUserName(userName: string) {
    return await Users.findOne({
      select: ['id'],
      where: {
        userName: userName,
      },
    });
  }

}