import { Injectable } from '@nestjs/common';
import { OnModuleInit, Inject, Param } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  GrpcMethod,
  ClientGrpc,
  Client,
  Transport,
} from "@nestjs/microservices";

import { grpcClientOptions } from "./grpc-location.options";
import { Observable } from "rxjs";
import { ILocation } from "./interfaces/location.interface";

export interface ILocationsService {
  getLocation(data: { id: number }): Observable<any>;
  getAllLocations(data: {}): Observable<any>;
  addLocation(data: ILocation): Observable<any>;
  deleteLocation(data: { id: number }): Observable<any>;
  searchLocation(data: { keyword: string }): Observable<any>;
}

@Injectable()
export class LocationService implements OnModuleInit {
  // @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private locationsService: ILocationsService;

  constructor(@Inject("LOCATION_PACKAGE") private client: ClientGrpc) {}

  onModuleInit() {
    this.locationsService =
      this.client.getService<ILocationsService>("LocationsService");
  }

  getLocation(id: number): Observable<ILocation> {
    return this.locationsService.getLocation({ id: id });
  }

  getAllLocation(): Observable<string> {
    return this.locationsService.getAllLocations({});
  }

  addLocation(data: ILocation): Observable<string> {
    return this.locationsService.addLocation(data)
  }

  deleteLocation(id: number): Observable<string> {
    return this.locationsService.deleteLocation({id: id})
  }

  searchLocation(keyword: string): Observable<string> {
    return this.locationsService.searchLocation({keyword: keyword})
  }
}
