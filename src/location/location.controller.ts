import { Controller } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";

@Controller("location")
export class LocationController {
  constructor(private readonly http: HttpService) {}

}
