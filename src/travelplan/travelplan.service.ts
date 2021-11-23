import { InjectModel } from '@nestjs/mongoose';
import { TravelPlan, TravelPlanDocument } from './model/travelplan.model';
import { Model } from 'mongoose';
import { ConsoleLogger, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TravelPlanPayloadDto } from "./dto/travelplan.dto";
import { ILocation } from "src/location/interfaces/location.interface";
import { FullTravelPlanPayloadDto } from "./dto/fulltravelplan.dto";
import { ClientProxy } from "@nestjs/microservices";
import { LocationService } from 'src/location/location.service';
import { map } from 'rxjs';

var _ = require('lodash');

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectModel(TravelPlan.name) private readonly travelPlanModel: Model<TravelPlanDocument>,
    @Inject('TRAVELPLAN_SERVICE') private readonly client: ClientProxy,
    private locationService: LocationService,
    
) {}


  async findUserTravelPlan(userName: string){
    const userTravelPlan = this.travelPlanModel.findOne({userName: userName})
    if (!userTravelPlan){
        throw new NotFoundException()
    }
    return userTravelPlan
  }

  async getAllPlans(){
    return this.travelPlanModel.find().exec();
  }

  async savePlan(travelPlanPayloadDto: TravelPlanPayloadDto){
        const locationList: ILocation[] = [];  
        for (const lid of travelPlanPayloadDto.locations){
          const prom = await this.locationService.getLocation(lid).pipe(map(
            (data: ILocation) => {locationList.push(data)}
          )).toPromise()
        }
          const fullTravelPlanPayloadDto: FullTravelPlanPayloadDto = {
            userName: travelPlanPayloadDto.userName,
            planName: travelPlanPayloadDto.planName,
            locations: locationList,
            description: travelPlanPayloadDto.description,
            isPublic: travelPlanPayloadDto.isPublic
          };
          this.client.emit('save-plan',fullTravelPlanPayloadDto);
          return fullTravelPlanPayloadDto;
        
  }
}