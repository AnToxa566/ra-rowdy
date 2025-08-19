import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountBalanceUpdateDto } from './create-account-balance-update.dto';

export class UpdateAccountBalanceUpdateDto extends PartialType(CreateAccountBalanceUpdateDto) {}
