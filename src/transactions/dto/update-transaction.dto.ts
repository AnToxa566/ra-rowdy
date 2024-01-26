export interface UpdateTransactionDto {
  name: string;
  sum: number;
  type: string;
  date: Date;
  description?: string;
}
