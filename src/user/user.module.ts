import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}