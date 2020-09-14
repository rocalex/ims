export class FeeManagementLookUpModel {
  Name: string;
  Url: string;
  Icon: string;
  Type: string;
}

export function FeeManagementLookUps(): FeeManagementLookUpModel[] {
  var list: FeeManagementLookUpModel[] = [
    { Name: 'Fee Component', Url: 'component', Icon: 'zmdi zmdi-money', Type: 'StudentFeeComponent' },
    { Name: 'Course Fee Terms', Url: 'coursefeeterms', Icon: 'zmdi zmdi-money', Type:'StudentCourseFeeTerm' },
    { Name: 'Students Fee', Url: 'studentfee', Icon: 'zmdi zmdi-money', Type: 'StudentStudentFee' },
    { Name: 'Fee Receipt', Url: 'feereceipt', Icon: 'zmdi zmdi-receipt', Type: 'StudentFeeReceipt' },
    { Name: 'Fee Refund', Url: 'refund', Icon: 'zmdi zmdi-refresh', Type: 'StudentFeeRefund' },
    { Name: 'Fee Report', Url: 'report', Icon: 'zmdi zmdi-file-text', Type: 'StudentFeeReport' }
  ];
  return list;
}

export enum FeeComponentTypeEnum {
  ApplicableToAll,
  Individual,
  Deduction,
  SpecialFee
}

export class FeeComponent {
  id: number;
  name: string;
  feeComponentType: FeeComponentTypeEnum;
  feeComponentTypeString: string;
  priority: number;
  instituteId: number;
}