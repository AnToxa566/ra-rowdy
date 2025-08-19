import { Controller, Get, Query } from '@nestjs/common';

import { AccountBalanceUpdatesService } from './account-balance-updates.service';

@Controller('account-balance-updates')
export class AccountBalanceUpdatesController {
  constructor(private readonly service: AccountBalanceUpdatesService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll({}, null, null, {
      sort: { createdAt: -1 },
      ...query,
    });
  }
}
