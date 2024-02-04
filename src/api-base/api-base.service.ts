import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface PagedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface QueryParams {
  page: string;
  pageSize: string;
  sort: string;
}

export interface ServiceConfig {
  populateFields?: string | string[];
}

@Injectable()
export class ApiBaseService<T, C, U> {
  constructor(
    protected model: Model<T>,
    protected config?: ServiceConfig,
  ) {}

  async getOne(id: string): Promise<T> {
    const model = await this.model
      .findById(id)
      .exec()
      .then((res) => this.populateResponse(res));

    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  async findOne(query: FilterQuery<T>): Promise<T> {
    const model = await this.model
      .findOne(query)
      .exec()
      .then((res) => this.populateResponse(res));

    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  async findAll(
    query: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
    queryParams?: Partial<QueryParams>,
  ): Promise<PagedResult<T>> {
    const page = parseInt(queryParams?.page || '1', 10) || 1;
    const pageSize = parseInt(queryParams?.pageSize || '9999', 10) || 9999;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.model
        .find(query, projection, {
          ...options,
          limit: pageSize,
          skip: skip,
        })
        .exec()
        .then((res) => this.populateResponse(res)),
      this.model.countDocuments(query).exec(),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async create(data: C): Promise<T> {
    const created = new this.model(data);
    return created.save() as T;
  }

  async update(id: string, data: Partial<U>) {
    return this.model
      .findByIdAndUpdate(id, data as any, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    return this.model.findOneAndDelete({ _id: id }).exec();
  }

  async deleteMany(filter: FilterQuery<T>) {
    return this.model.where(filter).deleteMany().exec();
  }

  private getPopulate() {
    return this.config?.populateFields || [];
  }

  private async populateResponse(res: any) {
    const populateFields = this.getPopulate();

    for (const path of populateFields) {
      await this.model.populate(res, { path });
    }

    return res;
  }
}
