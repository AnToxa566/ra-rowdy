import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { ApiBaseService } from '../api-base';

import { AccountBalanceUpdate, AccountBalanceUpdateDocument } from './entities';
import { CreateAccountBalanceUpdateDto } from './dto/create-account-balance-update.dto';
import { UpdateAccountBalanceUpdateDto } from './dto/update-account-balance-update.dto';

@Injectable()
export class AccountBalanceUpdatesService extends ApiBaseService<
  AccountBalanceUpdateDocument,
  CreateAccountBalanceUpdateDto,
  UpdateAccountBalanceUpdateDto
> {
  constructor(
    @InjectModel(AccountBalanceUpdate.name)
    model: Model<AccountBalanceUpdateDocument>,
  ) {
    super(model);
  }
}
