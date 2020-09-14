export class DriverMasterManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: DriverMasterManagementResponseType
}

export enum DriverMasterManagementResponseType {
  VehicleCode,
  VehicleType,
  FuelType,
  VehicleRegistrationNumber,
  EngineNumber,
  Id
}

export class AddDriverMasterManagementAc {
  Name: string;
  Salary: number;
  DateOfBirth: Date;
  MobileNumber: string;
  IsDriver: boolean;
  Address: string;
  LicenseNumber: string;
  LicenseType: string;
  DateOfIssue: Date;
  PlaceOfIssue: string;
  ValidityTill: Date;
  IssuingAuthority: string;
}

export class UpdateDriverMasterManagementAc {
  Id: number;
  Name: string;
  Salary: number;
  DateOfBirth: Date;
  MobileNumber: string;
  IsDriver: boolean;
  Address: string;
  LicenseNumber: string;
  LicenseType: string;
  DateOfIssue: Date;
  PlaceOfIssue: string;
  ValidityTill: Date;
  IssuingAuthority: Date;
}