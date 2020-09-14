export class UpdateAutoSequenceGeneratorManagementAc {
  constructor() {
    this.AutoSequenceGeneratorDataTypes = [];
  }
  Id: number;
  CustomText: string;
  SeperatorDescription: string;
  AutoSequenceGeneratorDataTypes: any[];
}

export class AutoSequenceGeneratorDataType {
  Id: number;
  IsSelected: boolean;
  OrderId: number;
  CreatedOn: Date;
}