import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  sum: number;

  @Prop({ required: true })
  color: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
