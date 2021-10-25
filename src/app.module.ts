import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RouteModule } from './route/route.module';
import { HttpModule } from '@nestjs/axios';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port:  parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ["dist/migrations/*{.ts,.js}"],
      cli: {
        migrationsDir: 'src/migrations',
      },
      synchronize: true,    
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    UserModule,
    AuthModule,
    RouteModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
