export interface UpdateTransactionDto {
  name: string;
  sum: number;
  type: string;
  date: Date;
  account: string;
  description?: string;
}
