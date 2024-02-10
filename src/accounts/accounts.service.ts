import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiBaseService } from '../api-base';

import { CreateAccountDto, TransferDto, UpdateAccountDto } from './dto';
import { Account, AccountDocument } from './schemas';

@Injectable()
export class AccountsService extends ApiBaseService<
  AccountDocument,
  CreateAccountDto,
  UpdateAccountDto
> {
  constructor(@InjectModel(Account.name) model: Model<AccountDocument>) {
    super(model);
  }

  async transfer(data: TransferDto): Promise<void> {
    const fromAccount = await super.getOne(data.from);
    const toAccount = await super.getOne(data.to);

    await super.update(data.from, { sum: fromAccount.sum - data.sum });
    await super.update(data.to, { sum: toAccount.sum + data.sum });
  }
}
