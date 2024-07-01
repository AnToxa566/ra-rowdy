export interface UpdateTransactionDto {
  name: string;
  sum: number;
  type: string;
  date: Date;
  account: string;
  category: string;
  description?: string;
}
