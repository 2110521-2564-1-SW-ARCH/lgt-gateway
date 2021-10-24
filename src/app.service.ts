import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    // comment for test cicd
    return "Hello World!";
  }
}
