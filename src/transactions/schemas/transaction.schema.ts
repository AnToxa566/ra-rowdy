import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Account } from '../../accounts';
import { Category } from '../../categories';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  sum: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  date: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Account.name,
    required: true,
  })
  account: Account;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;

  @Prop()
  description: string;

  @Prop({
    required: true,
    default: () => new Date(),
  })
  created_at: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
