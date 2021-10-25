import { Controller, OnModuleInit, Inject, Param, Get } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import {
  GrpcMethod,
  ClientGrpc,
  Client,
  Transport,
} from '@nestjs/microservices';

import { grpcClientOptions } from './grpc-location.options';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';


@ApiTags("location")
@Controller("location")
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get('all')
  GetAllLocations() {
    return this.locationService.getAllLocation();
  }
}
