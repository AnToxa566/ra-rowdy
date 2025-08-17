import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { AccountTransferService } from './account-transfer.service';
import { CreateAccountTransferDto } from './dto/create-account-transfer.dto';
import { UpdateAccountTransferDto } from './dto/update-account-transfer.dto';

@Controller('account-transfer')
export class AccountTransferController {
  constructor(
    private readonly accountTransferService: AccountTransferService,
  ) {}

  @Post()
  create(@Body() createAccountTransferDto: CreateAccountTransferDto) {
    return this.accountTransferService.create(createAccountTransferDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.accountTransferService.findAll({}, null, null, {
      sort: { createdAt: -1 },
      ...query,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountTransferService.getOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccountTransferDto: UpdateAccountTransferDto,
  ) {
    return this.accountTransferService.update(id, updateAccountTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountTransferService.delete(id);
  }
}
