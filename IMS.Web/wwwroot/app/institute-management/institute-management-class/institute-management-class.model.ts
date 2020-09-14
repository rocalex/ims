export class AddInstituteClass {
  constructor() {
    this.IsGroup = false;
  }
  GroupCode: string;
  Name: string;
  DurationUnit: InstituteClassDurationUnitEnum;
  Duration: number;
  IsGroup: boolean;
  ClassOrder: number;
  NumberOfFeeTerms: number;
  ClassTeacherId: number;
}

export class UpdateInstituteClass {
  constructor() {
    this.IsGroup = false;
  }
  Id: number;
  GroupCode: string;
  Name: string;
  DurationUnit: InstituteClassDurationUnitEnum;
  Duration: number;
  IsGroup: boolean;
  ClassOrder: number;
  NumberOfFeeTerms: number;
  ClassTeacherId: number;
}

export enum InstituteClassDurationUnitEnum {
  Days,
  Weeks,
  Months,
  Years
}

export enum InstituteClassResponseType {
  GroupCode,
  Name,
  Duration,
  ClassOrder,
  NumberOfFeeTerms,
  Other,
  ClassTeacherId
}

export class InstituteClassResponse {
  constructor() {
    this.HasError = false
  }
  Message: string;
  HasError: boolean;
  ErrorType: InstituteClassResponseType;
}