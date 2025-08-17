import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateAccountTransferDto {
  @IsString()
  @IsNotEmpty()
  fromId: string;

  @IsString()
  @IsNotEmpty()
  toId: string;

  @IsNumber()
  @Min(0)
  sum: number;

  @IsNumber()
  fromOldSum: number;

  @IsNumber()
  toOldSum: number;

  @IsNumber()
  fromNewSum: number;

  @IsNumber()
  toNewSum: number;
}
