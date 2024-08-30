import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';

import { ApiBaseService } from '../api-base';
import { TransferAccountLog, UpdateAccountLog } from '../common';

import { Account, AccountDocument } from './schemas';
import { CreateAccountDto, TransferDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountsService extends ApiBaseService<
  AccountDocument,
  CreateAccountDto,
  UpdateAccountDto
> {
  private readonly logger = new Logger(AccountsService.name);

  constructor(@InjectModel(Account.name) model: Model<AccountDocument>) {
    super(model);
  }

  async transfer(data: TransferDto): Promise<void> {
    if (data.from === data.to) {
      return;
    }

    const fromAccount = await super.getOne(data.from);
    const toAccount = await super.getOne(data.to);

    const fromNewSum = fromAccount.sum - data.sum;
    const toNewSum = toAccount.sum + data.sum;

    const log: TransferAccountLog = {
      from: data.from,
      to: data.to,
      sum: data.sum,
      fromOldSum: fromAccount.sum,
      toOldSum: toAccount.sum,
      fromNewSum,
      toNewSum,
    };

    await super.update(data.from, { sum: fromNewSum });
    await super.update(data.to, { sum: toNewSum });

    this.logger.log('Money transfer completed: ', log);
  }

  override async update(
    id: string,
    data: Partial<UpdateAccountDto>,
  ): Promise<AccountDocument> {
    const log: UpdateAccountLog = {
      id,
      data,
    };

    this.logger.log('Account updated: ', log);
    return await super.update(id, data);
  }
}
