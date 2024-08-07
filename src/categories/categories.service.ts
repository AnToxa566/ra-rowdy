import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { slugify } from 'src/utils';

import { ApiBaseService } from '../api-base';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category, CategoryDocument } from './schemas';

@Injectable()
export class CategoriesService extends ApiBaseService<
  CategoryDocument,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(@InjectModel(Category.name) model: Model<CategoryDocument>) {
    super(model);
  }

  override async create(data: CreateCategoryDto): Promise<CategoryDocument> {
    const newData = { ...data };

    if (data.name) {
      newData.slug = data.slug || slugify(data.name);
    }

    return super.create(newData);
  }

  override async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    const newData = { ...data };

    if (data.name) {
      newData.slug = data.slug || slugify(data.name);
    }

    return super.update(id, newData);
  }
}
