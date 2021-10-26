import { Users } from "../user/models/user.entity";
import { InjectModel } from '@nestjs/mongoose';
import { TravelPlan, TravelPlanDocument } from './model/travelplan.model';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from "@nestjs/common";
import { TravelPlanPayloadDto } from "./dto/travelplan.dto";


var _ = require('lodash');

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectModel(TravelPlan.name) 
    private readonly travelPlanModel: Model<TravelPlanDocument>
) {}

  // async findByUserName(userName: string) {
  //   return await Users.findOne({
  //     select: ['id'],
  //     where: {
  //       userName: userName,
  //     },
  //   });
  // }

  async findUserTravelPlan(userId: number){
    const userTravelPlan = this.travelPlanModel.findOne({userId: userId})
    if (!userTravelPlan){
        throw new NotFoundException()
    }
    return userTravelPlan
  }

  async getAllPlans(){
    return this.travelPlanModel.find().exec();
  }
}