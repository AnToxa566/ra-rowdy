import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { AccountBalanceUpdatesService } from './account-balance-updates.service';
import { AccountBalanceUpdatesController } from './account-balance-updates.controller';
import {
  AccountBalanceUpdate,
  AccountBalanceUpdateSchema,
} from './entities/account-balance-update.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountBalanceUpdate.name, schema: AccountBalanceUpdateSchema },
    ]),
  ],
  controllers: [AccountBalanceUpdatesController],
  providers: [AccountBalanceUpdatesService],
  exports: [AccountBalanceUpdatesService],
})
export class AccountBalanceUpdatesModule {}
