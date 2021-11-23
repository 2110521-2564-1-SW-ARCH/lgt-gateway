import { Controller, Param, Get, Post, Body, Delete } from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@ApiBearerAuth()
@ApiTags("location")
@Controller("location")
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get('all')
  getAllLocations() {
    return this.locationService.getAllLocation();
  }

  @Get(':ids') 
  getLocation(@Param('ids') id: number) {
    return this.locationService.getLocation(id)
  }

  @Get('search/:keyword')
  searchLocation(@Param('keyword') keyword: string) {
    return this.locationService.searchLocation(keyword)
  }

  @Post()
  addLocation(@Body() LocationPayload: CreateLocationDto) {
    return this.locationService.addLocation(LocationPayload)
  }

  @Delete(':id')
  deleteLocation(@Param('id') id: number) {
    return this.locationService.deleteLocation(id)
  }
}
