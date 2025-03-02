import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LaunchesService } from './services/launches.service';
import { PaginateDto } from './dto/paginate.dto';

@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Get()
  findAll(@Query() paginateDto: PaginateDto) {
    return this.launchesService.findAll(paginateDto);
  }

  @Get('analytics/per-year')
  analyticsPerYear() {
    return this.launchesService.analyticsPerYear();
  }
}
