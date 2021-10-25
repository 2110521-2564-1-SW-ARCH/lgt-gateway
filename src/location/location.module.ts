import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { HttpModule } from "@nestjs/axios";
import { JwtUtil } from "src/auth/jwt.util";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtUtil, AuthModule],
  controllers: [LocationController],
})
export class LocationModule {}
