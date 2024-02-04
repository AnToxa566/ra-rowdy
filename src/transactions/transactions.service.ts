import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TransactionType } from '../common';
import { ApiBaseService } from '../api-base';
import { AccountsService } from '../accounts';

import { Transaction, TransactionDocument } from './schemas';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';

@Injectable()
export class TransactionsService extends ApiBaseService<
  TransactionDocument,
  CreateTransactionDto,
  UpdateTransactionDto
> {
  constructor(
    @InjectModel(Transaction.name) model: Model<TransactionDocument>,
    private accountsService: AccountsService,
  ) {
    super(model, { populateFields: 'account' });
  }

  override async create(
    data: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    const account = await this.accountsService.getOne(data.account);

    const accountSum =
      account.sum +
      (data.type === TransactionType.INCOME ? data.sum : -data.sum);

    await this.accountsService.update(data.account, {
      sum: accountSum,
    });

    return await super.create(data);
  }

  override async update(
    id: string,
    data: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    const oldTransaction = await this.model.findById(id).exec();
    const account = await this.accountsService.getOne(data.account);

    let accountSum = account.sum;

    if (oldTransaction.type === TransactionType.INCOME) {
      accountSum -= oldTransaction.sum;
    } else {
      accountSum += oldTransaction.sum;
    }

    if (data.type === TransactionType.INCOME) {
      accountSum += data.sum;
    } else {
      accountSum -= data.sum;
    }

    this.accountsService.update(data.account, {
      sum: accountSum,
    });

    return await super.update(id, data);
  }

  override async delete(id: string) {
    const oldTransaction = await this.model.findById(id).exec();
    const accountId = oldTransaction.account as unknown as string;

    const account = await this.accountsService.getOne(accountId);

    let accountSum = account.sum;

    if (oldTransaction.type === TransactionType.INCOME) {
      accountSum -= oldTransaction.sum;
    } else {
      accountSum += oldTransaction.sum;
    }

    this.accountsService.update(accountId, {
      sum: accountSum,
    });

    return await super.delete(id);
  }
}
