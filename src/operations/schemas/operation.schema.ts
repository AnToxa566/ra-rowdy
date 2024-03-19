import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { OperationType } from 'src/common';

export type OperationDocument = HydratedDocument<Operation>;

@Schema()
export class Operation {
  @Prop({ required: true, enum: OperationType })
  type: OperationType;

  @Prop({
    type: {
      name: String,
      sum: Number,
    },
  })
  oldTransaction: {
    name: string;
    sum: number;
  };

  @Prop({
    type: {
      name: String,
      sum: Number,
    },
  })
  newTransaction: {
    name: string;
    sum: number;
  };
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
