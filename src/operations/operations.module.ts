import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { Operation, OperationSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
  ],
  providers: [OperationsService],
  controllers: [OperationsController],
})
export class OperationsModule {}
