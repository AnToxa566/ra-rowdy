import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiBaseService } from 'src/api-base/api-base.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService extends ApiBaseService<
  TransactionDocument,
  CreateTransactionDto,
  UpdateTransactionDto
> {
  constructor(
    @InjectModel(Transaction.name) model: Model<TransactionDocument>,
  ) {
    super(model);
  }
}
