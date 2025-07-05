import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async findAll() {
    return await this.service.findAll({});
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    return await this.service.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
