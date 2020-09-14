export class AddFeeRefundManagementAc {
  RefundNumber: string;
  ChallanNumber: string;
  StudentId: number;
  RefundDate: Date;
  IssuedById: string;
  Amount: number;
  ChequeNumber: string;
  ChequeDate: Date;
  BankName: string;
  Remark: string;
}

export class UpdateFeeRefundManagementAc {
  Id: number;
  RefundNumber: string;
  ChallanNumber: string;
  Student: string;
  RefundDate: Date;
  IssuedById: string;
  Amount: number;
  ChequeNumber: string;
  ChequeDate: Date;
  BankName: string;
  Remark: string;
  StudentDetail: any;
}

export class FeeRefundManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: FeeRefundManagementErrorType;
}

export enum FeeRefundManagementErrorType {
  StudentId,
  IssuedById,
  RefundNumber,
  ChallanNumber,
  ChequeNumber,
  BankName,
  Amount,
  Id
}