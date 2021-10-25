import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { join } from "path";
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [
    {
      provide: "LOCATION_PACKAGE",
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: "location",
            protoPath: join(process.cwd(), "./src/location/location.proto"),
            url: configService.get("GRPC_CONNECTION_URL"),
          },
        });
      },
      inject: [ConfigService],
    },
    LocationService,
  ],
})
export class LocationModule {}
