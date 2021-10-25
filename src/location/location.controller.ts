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


interface LocationService {
  getLocation(data: {id: number}) : Observable<any>
  getAllLocations(data: {}) : Observable<any>
  addLocation(data: {
    name: string,
    description: string,
    type: string,
    address: string,
    district: string,
    subDistrict: string,
    postCode: string,
    province: string,
    lattitude: string,
    longitude: string,
    imgURL: string,
    closestStation: number
  }) : Observable<any>
  deleteLocation(data: {id: number}) : Observable<any>
  searchLocation(data: {keywork: string}) : Observable<any>
}

@ApiTags('location')
@Controller("location")
export class LocationController implements OnModuleInit {
  // @Client(grpcClientOptions) private readonly client: ClientGrpc
  private locationsService: LocationService;

  constructor(
    @Inject('LOCATION_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.locationsService = this.client.getService<LocationService>('LocationsService');
  }

  @Get()
  getLocation(@Param('id') id): Observable<string> {
    return this.locationsService.getLocation({id: id})
  }

  @Get('all')
  getAllLocation():  Observable<string> {
    return this.locationsService.getAllLocations({})
  }

  
}
