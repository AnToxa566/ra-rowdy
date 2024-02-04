import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApiBaseService } from '../api-base';

import { CreateAccountDto, UpdateAccountDto } from './dto';
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
}
