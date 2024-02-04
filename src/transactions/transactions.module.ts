import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Account, AccountSchema, AccountsService } from '../accounts';

import { Transaction, TransactionSchema } from './schemas';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  providers: [TransactionsService, AccountsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
