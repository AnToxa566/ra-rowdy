import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountBalanceUpdateDocument = AccountBalanceUpdate & Document;

@Schema({ timestamps: true })
export class AccountBalanceUpdate {
  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  oldSum: number;

  @Prop({ required: true })
  newSum: number;
}

export const AccountBalanceUpdateSchema =
  SchemaFactory.createForClass(AccountBalanceUpdate);
