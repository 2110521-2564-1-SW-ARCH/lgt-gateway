import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete, Inject, Patch } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { TravelPlanService } from "./travelplan.service";
import { TravelPlanPayloadDto } from "./dto/travelplan.dto";
import { FullTravelPlanPayloadDto } from "./dto/fulltravelplan.dto";
import { ILocationsService } from "src/location/location.service";
import { ILocation } from "src/location/interfaces/location.interface";

@ApiTags('travel-catalog')
@Controller('api/travel-catalog')
export class TravelPlanController {
    constructor(
        private travelPlanService: TravelPlanService,
        @Inject('TRAVELPLAN_SERVICE') private readonly client: ClientProxy
    ) { }
    private locationsService: ILocationsService;
    @Post('/save-plan')
    async savePlan(@Body() travelPlanPayloadDto: TravelPlanPayloadDto){
        const locations: ILocation[] = [{name: "a",
            description: 'string',
            type: 'string',
            address: 'string',
            district: 'string',
            subDistrict: 'string',
            postCode: 'string',
            province: 'string',
            latitude: 'string',
            longitude: 'string',
            imgURL: 'string',
            closestStation: 1}];
        // for (lid in travelPlanPayloadDto.locations){
        //     locations.push(this.locationsService.getLocation(lid))
        // }
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