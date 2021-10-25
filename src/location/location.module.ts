import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { HttpModule } from "@nestjs/axios";
import { JwtUtil } from "src/auth/jwt.util";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [LocationController],
  providers: [],
})
export class LocationModule {}
