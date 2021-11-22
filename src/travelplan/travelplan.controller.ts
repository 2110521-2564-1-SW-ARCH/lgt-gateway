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
            console.log(lid)
            const response = this.http.get('http://165.22.240.38:8000/docs/location/' + lid).pipe(map((res) => res.data))
            console.log(response)
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

    @Get('/get-user-plan/:id')
    async getUserPlan(@Param('id') id: number){
        return this.travelPlanService.findUserTravelPlan(id)
    }

    @Get('/get-plan')
    async getPlan() {
        return this.travelPlanService.getAllPlans()
    }
    
}


