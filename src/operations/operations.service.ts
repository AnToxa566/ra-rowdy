import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiBaseService } from '../api-base';

import { CreateOperationDto, UpdateOperationDto } from './dto';
import { Operation, OperationDocument } from './schemas';

@Injectable()
export class OperationsService extends ApiBaseService<
  OperationDocument,
  CreateOperationDto,
  UpdateOperationDto
> {
  constructor(@InjectModel(Operation.name) model: Model<OperationDocument>) {
    super(model);
  }
}
