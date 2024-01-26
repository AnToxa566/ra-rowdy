export interface CreateTransactionDto {
  name: string;
  sum: number;
  type: string;
  date: Date;
  description?: string;
}
