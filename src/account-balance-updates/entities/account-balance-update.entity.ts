import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { AccountBalanceUpdateType } from '../../common/enum/account-balance-update-type.enum';

export type AccountBalanceUpdateDocument = AccountBalanceUpdate & Document;

@Schema({ timestamps: true })
export class AccountBalanceUpdate {
  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  oldSum: number;

  @Prop({ required: true })
  newSum: number;

  @Prop({
    required: true,
    enum: AccountBalanceUpdateType,
    default: AccountBalanceUpdateType.ManualUpdate,
  })
  type: AccountBalanceUpdateType;
}

export const AccountBalanceUpdateSchema =
  SchemaFactory.createForClass(AccountBalanceUpdate);
