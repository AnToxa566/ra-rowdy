import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { slugify } from 'src/utils';

import { ApiBaseService } from '../api-base';

import { Product, ProductDocument } from './schemas';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService extends ApiBaseService<
  ProductDocument,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectModel(Product.name) model: Model<ProductDocument>) {
    super(model);
  }

  override async create(data: CreateProductDto): Promise<ProductDocument> {
    const newData = { ...data };

    if (data.label?.en) {
      newData.slug = data.slug || slugify(data.label.en);
    }

    return super.create(newData);
  }

  override async update(
    id: string,
    data: UpdateProductDto,
  ): Promise<ProductDocument> {
    const newData = { ...data };

    if (data.label?.en) {
      newData.slug = data.slug || slugify(data.label.en);
    }

    return super.update(id, newData);
  }
}
