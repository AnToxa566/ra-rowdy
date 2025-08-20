import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { AccountBalanceUpdateType } from '../../common/enum/account-balance-update-type.enum';

export class CreateAccountBalanceUpdateDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsNumber()
  @IsNotEmpty()
  oldSum: number;

  @IsNumber()
  @IsNotEmpty()
  newSum: number;

  @IsEnum(AccountBalanceUpdateType)
  @IsOptional()
  type?: AccountBalanceUpdateType;
}
