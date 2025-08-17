import { PartialType } from '@nestjs/mapped-types';

import { CreateAccountTransferDto } from './create-account-transfer.dto';

export class UpdateAccountTransferDto extends PartialType(
  CreateAccountTransferDto,
) {}
