import { Test, TestingModule } from '@nestjs/testing';
import { AccountTransferService } from './account-transfer.service';

describe('AccountTransferService', () => {
  let service: AccountTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountTransferService],
    }).compile();

    service = module.get<AccountTransferService>(AccountTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
