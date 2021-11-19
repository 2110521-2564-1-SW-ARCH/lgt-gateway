import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete, Inject, Patch } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { TravelPlanService } from "./travelplan.service";
import { TravelPlanPayloadDto } from "./dto/travelplan.dto";
import { DeletePlanPayloadDto } from "./dto/deleteplan.dto";

@ApiTags('travel-catalog')
@Controller('api/travel-catalog')
export class TravelPlanController {
    constructor(
        private travelPlanService: TravelPlanService,
        @Inject('TRAVELPLAN_SERVICE') private readonly client: ClientProxy
    ) { }

    @Post('/save-plan')
    async savePlan(@Body() travelPlanPayloadDto: TravelPlanPayloadDto){
        this.client.emit('save-plan',travelPlanPayloadDto);
        return travelPlanPayloadDto;
    }
    
    // @Patch('/update-plan')
    // async updateTravelPlan(@Body() travelPlanPayloadDto: TravelPlanPayloadDto){
    //     this.client.emit('update-plan',travelPlanPayloadDto);
    //     return travelPlanPayloadDto
    // }

    // @Delete('/delete-plan')
    // async deleteTravelPlan(@Body() deletePlanPayloadDto: DeletePlanPayloadDto){
    //     this.client.emit('delete-plan', deletePlanPayloadDto);
    //     return deletePlanPayloadDto
    // }

    @Get('/get-user-plan/:id')
    async getUserPlan(@Param('id') id: number){
        return this.travelPlanService.findUserTravelPlan(id)
    }

    @Get('/get-plan')
    async getPlan() {
        return this.travelPlanService.getAllPlans()
    }
    
}