import { Model, FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TransactionType } from '../common';
import { AccountsService } from '../accounts';
import { ApiBaseService, PagedResult, QueryParams } from '../api-base';

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

  override async findAll(
    query: FilterQuery<TransactionDocument>,
    projection?: ProjectionType<TransactionDocument> | null | undefined,
    options?: QueryOptions<TransactionDocument> | null | undefined,
    queryParams?: Partial<QueryParams>,
  ): Promise<PagedResult<TransactionDocument>> {
    if (query.startDate && query.endDate) {
      query.date = {
        $gte: new Date(query.startDate),
        $lt: new Date(query.endDate),
      };

      delete query.startDate;
      delete query.endDate;
    }

    return await super.findAll(query, projection, options, queryParams);
  }

  override async create(
    data: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    let { sum: accountSum } = await this.accountsService.getOne(data.account);

    accountSum += data.type === TransactionType.INCOME ? data.sum : -data.sum;

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

    const oldAccount = await this.accountsService.getOne(
      oldTransaction.account as unknown as string,
    );

    if (oldTransaction.type === TransactionType.INCOME) {
      oldAccount.sum -= oldTransaction.sum;
    } else {
      oldAccount.sum += oldTransaction.sum;
    }

    await this.accountsService.update(oldAccount.id, {
      sum: oldAccount.sum,
    });

    const newAccount = await this.accountsService.getOne(data.account);

    if (data.type === TransactionType.INCOME) {
      newAccount.sum += data.sum;
    } else {
      newAccount.sum -= data.sum;
    }

    await this.accountsService.update(data.account, {
      sum: newAccount.sum,
    });

    return await super.update(id, data);
  }

  override async delete(id: string) {
    const oldTransaction = await this.model.findById(id).exec();
    const accountId = oldTransaction.account as unknown as string;

    let { sum: accountSum } = await this.accountsService.getOne(accountId);

    if (oldTransaction.type === TransactionType.INCOME) {
      accountSum -= oldTransaction.sum;
    } else {
      accountSum += oldTransaction.sum;
    }

    await this.accountsService.update(accountId, {
      sum: accountSum,
    });

    return await super.delete(id);
  }
}
