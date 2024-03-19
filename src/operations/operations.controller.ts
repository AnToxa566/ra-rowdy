import { Body, Controller, Get, Post } from '@nestjs/common';

import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto';

@Controller('operations')
export class OperationsController {
  constructor(private service: OperationsService) {}

  @Get()
  async findAll() {
    return await this.service.findAll({});
  }

  @Post()
  async create(@Body() data: CreateOperationDto) {
    return await this.service.create(data);
  }
}
