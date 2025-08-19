import { Controller, Get, Query } from '@nestjs/common';

import { AccountTransferService } from './account-transfer.service';

@Controller('account-transfer')
export class AccountTransferController {
  constructor(
    private readonly accountTransferService: AccountTransferService,
  ) {}

  @Get()
  findAll(@Query() query: any) {
    return this.accountTransferService.findAll({}, null, null, {
      sort: { createdAt: -1 },
      ...query,
    });
  }
}
