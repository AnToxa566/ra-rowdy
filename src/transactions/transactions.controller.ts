import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private service: TransactionsService) {}

  @Get()
  async findAll(
    @Query() query: { type?: string; startDate?: string; endDate?: string },
  ) {
    return await this.service.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateTransactionDto) {
    return await this.service.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateTransactionDto) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
