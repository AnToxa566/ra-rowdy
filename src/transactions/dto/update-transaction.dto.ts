export interface UpdateTransactionDto {
  sum: number;
  type: string;
  date: Date;
  account: string;
  category: string;
  description?: string;
}
