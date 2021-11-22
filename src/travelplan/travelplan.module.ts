import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { TravelPlan, TravelPlanSchema } from "./model/travelplan.model";
import { TravelPlanController } from "./travelplan.controller";
import { TravelPlanService } from "./travelplan.service";

@Module({
    imports:[
        HttpModule,
        MongooseModule.forFeature([{name: TravelPlan.name ,schema: TravelPlanSchema}]),
        ClientsModule.register([
            {
              name: 'TRAVELPLAN_SERVICE',
              transport: Transport.RMQ,
              options: {
                urls: ['amqps://gqldglik:XY93b97Po2ojTHxaHHbSQfkX_I1MZJPN@elk.rmq2.cloudamqp.com/gqldglik'],
                queue: 'main_queue',
                queueOptions: {
                  durable: false
                },
              },
            },
        ]),
    ],
    providers: [TravelPlanService, JwtStrategy],
    controllers: [TravelPlanController],
    exports: [TravelPlanService],
})
export class TravelPlanModule {}