import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Product, ProductSchema } from './schemas';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
