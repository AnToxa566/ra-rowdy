import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';

import { ApiBaseService } from '../api-base';
import { UpdateAccountLog } from '../common';
import {
  CreateAccountTransferDto,
  AccountTransferService,
} from '../account-transfer';
import { AccountBalanceUpdatesService } from '../account-balance-updates';
import { AccountBalanceUpdateType } from '../common/enum/account-balance-update-type.enum';

import { Account, AccountDocument } from './schemas';
import { CreateAccountDto, TransferDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountsService extends ApiBaseService<
  AccountDocument,
  CreateAccountDto,
  UpdateAccountDto
> {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    @InjectModel(Account.name) model: Model<AccountDocument>,
    private readonly accountTransferService: AccountTransferService,
    private readonly accountBalanceUpdatesService: AccountBalanceUpdatesService,
  ) {
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

    const accountTransfer: CreateAccountTransferDto = {
      fromId: data.from,
      toId: data.to,
      sum: data.sum,
      fromOldSum: fromAccount.sum,
      toOldSum: toAccount.sum,
      fromNewSum,
      toNewSum,
    };

    await super.update(data.from, { sum: fromNewSum });
    await super.update(data.to, { sum: toNewSum });

    await this.accountTransferService.create(accountTransfer);

    this.logger.log('Money transfer completed: ', accountTransfer);
  }

  override async update(
    id: string,
    data: Partial<UpdateAccountDto>,
    type?: AccountBalanceUpdateType,
  ): Promise<AccountDocument> {
    const log: UpdateAccountLog = {
      id,
      data,
    };

    this.logger.log('Account updated: ', log);

    if (data.sum) {
      const account = await super.getOne(id);

      await this.accountBalanceUpdatesService.create({
        accountId: id,
        newSum: data.sum,
        oldSum: account.sum,
        type: type || AccountBalanceUpdateType.ManualUpdate,
      });
    }

    return await super.update(id, data);
  }
}
