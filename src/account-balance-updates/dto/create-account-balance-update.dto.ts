import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

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
}
