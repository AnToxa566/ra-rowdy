import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AccountsModule } from './accounts';
import { ProductsModule } from './products';
import { OperationsModule } from './operations';
import { CategoriesModule } from './categories';
import { TransactionsModule } from './transactions';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AccountsModule,
    ProductsModule,
    CategoriesModule,
    OperationsModule,
    TransactionsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
