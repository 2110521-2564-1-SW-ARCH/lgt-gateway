import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete, Inject, Patch } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { TravelPlanService } from "./travelplan.service";
import { TravelPlanPayloadDto } from "./dto/travelplan.dto";
import { FullTravelPlanPayloadDto } from "./dto/fulltravelplan.dto";
import { ILocationsService, LocationService } from "src/location/location.service";
import { ILocation } from "src/location/interfaces/location.interface";
import { HttpService } from "@nestjs/axios";
import { response } from "express";
import { map } from "rxjs";

@ApiTags('travel-catalog')
@Controller('api/travel-catalog')
export class TravelPlanController {
    constructor(
        private travelPlanService: TravelPlanService,
        private readonly http: HttpService,
        @Inject('TRAVELPLAN_SERVICE') private readonly client: ClientProxy
    ) { }
   
    @Post('/save-plan')
    async savePlan(@Body() travelPlanPayloadDto: TravelPlanPayloadDto){
        const locations: ILocation[] = [];
        travelPlanPayloadDto.locations.forEach(async (lid:number) => {
            const response = await this.http.get('http://localhost:8000/location/' + lid).pipe(map((res) => res.data)).toPromise()
            console.log(response)
            locations.push(response)
        });
        const fullTravelPlanPayloadDto: FullTravelPlanPayloadDto = {
            userName: travelPlanPayloadDto.userName,
            planName: travelPlanPayloadDto.planName,
            locations: locations,
            description: travelPlanPayloadDto.description
        };
        this.client.emit('save-plan',fullTravelPlanPayloadDto);
        return fullTravelPlanPayloadDto;
    }

    @Get('/get-user-plan/:userName')
    async getUserPlan(@Param('userName') userName: string){
        return this.travelPlanService.findUserTravelPlan(userName)
    }

    @Get('/get-plan')
    async getPlan() {
        return this.travelPlanService.getAllPlans()
    }
    
}


