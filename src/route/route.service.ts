import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

interface IRoute {
    id?: number,
    source: string,
    destination: string,
    time: number,
    type: string,
    additional_type?: string,
}

interface IRouteResponse {
    time: number;
    route: IRoute[];
}

@Injectable()
export class RouteService {
    constructor(
        private httpService: HttpService,
    ) {}

    async searchRoute(requestBody): Promise<Observable<AxiosResponse>> {
        // const response = this.httpService
        //     .post(
        //         `${process.env.ROUTE_URL}/api/routes/search-route`,
        //         requestBody
        //     )
        //     .pipe(map(response => response.data))
        // console.log("response", response)
        return this.httpService
        .post(
            `${process.env.ROUTE_URL}/api/routes/search-route`,
            requestBody
        )
        .pipe(map(response => response.data))
    }

    // createRoute(): Observable<AxiosResponse<IRouteResponse>> {
    //     return this.httpService.get('http://localhost:3000/cats');
    // }

    // deleteRoute(): Observable<AxiosResponse<IRouteResponse>> {
    //     return this.httpService.get('http://localhost:3000/cats');
    // }
}