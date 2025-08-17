import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { AccountTransferService } from './account-transfer.service';
import { AccountTransferController } from './account-transfer.controller';
import { AccountTransfer, AccountTransferSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountTransfer.name, schema: AccountTransferSchema },
    ]),
  ],
  controllers: [AccountTransferController],
  providers: [AccountTransferService],
  exports: [AccountTransferService],
})
export class AccountTransferModule {}
