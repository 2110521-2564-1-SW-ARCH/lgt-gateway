import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete, Inject, Patch } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { TravelPlanService } from "./travelplan.service";
import { TravelPlanPayloadDto } from "./dto/travelplan.dto";


@ApiTags('travel-catalog')
@Controller('api/travel-catalog')
export class TravelPlanController {
    constructor(
        private travelPlanService: TravelPlanService,
    ) { }
   
    @Post('/save-plan')
    async savePlan(@Body() travelPlanPayloadDto: TravelPlanPayloadDto){
        return this.travelPlanService.savePlan(travelPlanPayloadDto)
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


