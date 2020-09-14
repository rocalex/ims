export class FeeReceiptAc {
  constructor() {
    this.Amount = 0;
    this.LateFee = 0;
    this.PreviousAmountPaid = 0;
    this.Total = 0;
    this.FeeReceiptComponents = [];
    this.ReceiptNumber = '';
    this.ChallanNumber = '';
    this.IsSelected = false;
  }
  IsSelected: boolean;
  StudentId: number;
  ReceiptNumber: string;
  ChallanNumber: string;
  ReceiptDate: Date;
  ReceiptType: string;
  ChequeNumber: string;
  ChequeDate: Date;
  BankName: string;
  Amount: number;
  LateFee: number
  PreviousAmountPaid: number;
  Total: number;
  IsNewAdmission: boolean;
  ClassId: number;
  StudentDetail: string;
  FeeReceiptComponents: FeeReceiptComponentAc[];
  Term: number;
}

export class FeeReceiptComponentAc {
  Name: string;
  Amount: number;
  Id: number;
}

export class FeeReceiptManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: FeeReceiptManagementResponseType;
  OrderId: number;
}

export enum FeeReceiptManagementResponseType {

}