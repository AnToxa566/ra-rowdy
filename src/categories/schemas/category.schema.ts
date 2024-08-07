import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ required: true })
  color: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
