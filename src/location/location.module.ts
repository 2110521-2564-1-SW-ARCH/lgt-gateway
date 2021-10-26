import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { join } from "path";
import { LocationService } from './location.service';
import { ClientsModule } from "@nestjs/microservices";

console.log(join(__dirname, './location.proto'))
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOCATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'location',
          protoPath: join(__dirname, './location.proto'),
        },
      },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
