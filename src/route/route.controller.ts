import { Body, Controller, Headers , Param, Post, HttpStatus, HttpCode, Delete, UseGuards, UnauthorizedException, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { GetRoutePayloadDto } from "./dto/get-route.dto";
import { CreateRoutePayloadDto } from "./dto/create-route.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { JwtUtil } from "src/auth/jwt.util";


@ApiTags('routes')
@Controller('api/routes')
export class RouteController {
    constructor(
        private readonly http: HttpService,
        private readonly jwtUtil: JwtUtil
        ){}

    @HttpCode(HttpStatus.OK)
    @Post('search-route')
    async searchRoute(@Body() RoutePayload: GetRoutePayloadDto): Promise<Observable<AxiosResponse<any>>> {
        const headers = {
            'Content-Type': 'application/json',
        }
        return await this.http
            .post(
                `${process.env.ROUTE_URL}/api/routes/search-route`,
                RoutePayload,
                {
                    headers: headers
                })
            .pipe(map(response => response.data))
    }

    @HttpCode(HttpStatus.OK)
    @Get('source')
    async getSource(): Promise<Observable<AxiosResponse<any>>> {
        const headers = {
            'Content-Type': 'application/json',
        }
        return await this.http
            .get(
                `${process.env.ROUTE_URL}/api/routes/source`,
                {
                    headers: headers
                })
            .pipe(map(response => response.data))
    }

    @HttpCode(HttpStatus.OK)
    @Get('destination')
    async getDestination(): Promise<Observable<AxiosResponse<any>>> {
        const headers = {
            'Content-Type': 'application/json',
        }
        return await this.http
            .get(
                `${process.env.ROUTE_URL}/api/routes/destination`,
                {
                    headers: headers
                })
            .pipe(map(response => response.data))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('save-route')
    async createRoute(@Headers('Authorization') auth: string, @Body() RoutePayload: CreateRoutePayloadDto): Promise<Observable<AxiosResponse<any>>> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
        const tokenDecoded = this.jwtUtil.decode(auth)
        if (tokenDecoded.userId){
            return this.http
                .post(
                    `${process.env.ROUTE_URL}/api/routes/save-route`,
                    RoutePayload,
                    {
                        headers: headers
                    })
                .pipe(map(response => response.data))
        } else {
            throw new UnauthorizedException()
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async deleteRoute(@Headers('Authorization') auth: string, @Param('id') routeId: number): Promise<Observable<AxiosResponse<any>>> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
        const tokenDecoded = this.jwtUtil.decode(auth)
        if (tokenDecoded.userId){
        return this.http
            .delete(
                `${process.env.ROUTE_URL}/api/routes/${routeId}`,
                {
                    headers: headers
                })
            .pipe(map(response => response.data))
        } else {
            throw new UnauthorizedException()
        }
    }
}
