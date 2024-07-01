export interface CreateTransactionDto {
  name: string;
  sum: number;
  type: string;
  date: Date;
  account: string;
  category: string;
  description?: string;
}
