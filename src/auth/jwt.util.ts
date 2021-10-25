import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtUtil {
    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): {
        userId: string,
        uuid: string,
        iat: string
    }{
        const jwt = auth.replace('Bearer ', '');
        return this.jwtService.decode(
            jwt, 
            { json: true }
            ) as { 
                userId: string, 
                iat: string, 
                uuid: string 
            };
    }
}