export interface CreateTransactionLog {
  sum: number;
  type: string;
  account: string;
  category: string;
  oldAccounSum: number;
  newAccounSum: number;
}

export interface UpdateTransactionLog {
  oldTransaction: object;
  newTransaction: object;
  oldAccountBeforeUpdateSum: number;
  oldAccountAfterUpdateSum: number;
  newAccountBeforeUpdateSum: number;
  newAccountAfterUpdateSum: number;
}

export interface DeleteTransactionLog {
  transaction: object;
  oldAccountSum: number;
  newAccountSum: number;
}
