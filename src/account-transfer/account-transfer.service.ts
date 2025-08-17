import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ApiBaseService } from '../api-base';

import { AccountTransfer, AccountTransferDocument } from './entities';
import { CreateAccountTransferDto } from './dto/create-account-transfer.dto';
import { UpdateAccountTransferDto } from './dto/update-account-transfer.dto';

@Injectable()
export class AccountTransferService extends ApiBaseService<
  AccountTransferDocument,
  CreateAccountTransferDto,
  UpdateAccountTransferDto
> {
  constructor(
    @InjectModel(AccountTransfer.name) model: Model<AccountTransferDocument>,
  ) {
    super(model);
  }
}
