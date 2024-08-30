export interface TransferAccountLog {
  from: string;
  to: string;
  sum: number;
  fromOldSum: number;
  fromNewSum: number;
  toOldSum: number;
  toNewSum: number;
}

export interface UpdateAccountLog {
  id: string;
  data: object;
}
