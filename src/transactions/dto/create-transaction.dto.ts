export interface CreateTransactionDto {
  sum: number;
  type: string;
  date: Date;
  account: string;
  category: string;
  description?: string;
}
