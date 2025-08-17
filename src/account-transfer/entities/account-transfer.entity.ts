import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountTransferDocument = AccountTransfer & Document;

@Schema({ timestamps: true })
export class AccountTransfer {
  @Prop({ required: true })
  fromId: string;

  @Prop({ required: true })
  toId: string;

  @Prop({ required: true, min: 0 })
  sum: number;

  @Prop({ required: true })
  fromOldSum: number;

  @Prop({ required: true })
  toOldSum: number;

  @Prop({ required: true })
  fromNewSum: number;

  @Prop({ required: true })
  toNewSum: number;
}

export const AccountTransferSchema =
  SchemaFactory.createForClass(AccountTransfer);
