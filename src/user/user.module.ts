import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
    imports:[
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
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}