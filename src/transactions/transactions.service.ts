import { Model, FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  CreateTransactionLog,
  DeleteTransactionLog,
  TransactionType,
  UpdateTransactionLog,
} from '../common';
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
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    @InjectModel(Transaction.name) model: Model<TransactionDocument>,
    private accountsService: AccountsService,
  ) {
    super(model, { populateFields: ['category', 'account'] });
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
    const log: CreateTransactionLog = {
      sum: data.sum,
      type: data.type,
      account: data.account,
      category: data.category,
      oldAccounSum: 0,
      newAccounSum: 0,
    };

    let { sum: accountSum } = await this.accountsService.getOne(data.account);
    log.oldAccounSum = accountSum;

    accountSum += data.type === TransactionType.INCOME ? data.sum : -data.sum;
    log.newAccounSum = accountSum;

    await this.accountsService.update(data.account, {
      sum: accountSum,
    });

    this.logger.log('Transaction created: ', log);
    return await super.create(data);
  }

  override async update(
    id: string,
    data: Partial<CreateTransactionDto>,
  ): Promise<TransactionDocument> {
    const log: UpdateTransactionLog = {
      oldTransaction: {},
      newTransaction: data,
      oldAccountBeforeUpdateSum: 0,
      oldAccountAfterUpdateSum: 0,
      newAccountBeforeUpdateSum: 0,
      newAccountAfterUpdateSum: 0,
    };

    const oldTransaction = await this.model.findById(id).exec();
    log.oldTransaction = oldTransaction;

    const oldAccount = await this.accountsService.getOne(
      oldTransaction.account as unknown as string,
    );
    log.oldAccountBeforeUpdateSum = oldAccount.sum;

    if (oldTransaction.type === TransactionType.INCOME) {
      oldAccount.sum -= oldTransaction.sum;
    } else {
      oldAccount.sum += oldTransaction.sum;
    }

    log.oldAccountAfterUpdateSum = oldAccount.sum;

    await this.accountsService.update(oldAccount.id, {
      sum: oldAccount.sum,
    });

    const newAccount = await this.accountsService.getOne(data.account);
    log.newAccountBeforeUpdateSum = newAccount.sum;

    if (data.type === TransactionType.INCOME) {
      newAccount.sum += data.sum;
    } else {
      newAccount.sum -= data.sum;
    }

    log.newAccountAfterUpdateSum = newAccount.sum;

    await this.accountsService.update(data.account, {
      sum: newAccount.sum,
    });

    this.logger.log('Transaction updated: ', log);
    return await super.update(id, data);
  }

  override async delete(id: string) {
    const log: DeleteTransactionLog = {
      transaction: {},
      oldAccountSum: 0,
      newAccountSum: 0,
    };

    const oldTransaction = await this.model.findById(id).exec();
    const accountId = oldTransaction.account as unknown as string;

    log.transaction = oldTransaction;

    let { sum: accountSum } = await this.accountsService.getOne(accountId);
    log.oldAccountSum = accountSum;

    if (oldTransaction.type === TransactionType.INCOME) {
      accountSum -= oldTransaction.sum;
    } else {
      accountSum += oldTransaction.sum;
    }

    log.newAccountSum = accountSum;

    await this.accountsService.update(accountId, {
      sum: accountSum,
    });

    this.logger.log('Transaction deleted: ', log);
    return await super.delete(id);
  }
}
