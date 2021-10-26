import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete, Inject } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { TravelPlanService } from "./travelplan.service";

@ApiTags('travel-catalog')
@Controller('api/travel-catalog/save-plan')
export class TravelPlanController {
    constructor(
        private travelPlanService: TravelPlanService,
        @Inject('TRAVELPLAN_SERVICE') private readonly client: ClientProxy
    ) { }

    @Get(':username')
    async savePlan(@Param('username') username: string){
        const userid = await this.travelPlanService.findByUserName(username)
        this.client.emit('getCurrentUserId',userid.id);
        return userid;
    }
}