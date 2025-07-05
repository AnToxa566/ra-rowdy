import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, type: { en: String, ru: String, uk: String } })
  label: {
    en: string;
    ru: string;
    uk: string;
  };

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true })
  imageSrc: string;

  @Prop({ required: true, default: 0 })
  count: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
