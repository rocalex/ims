export class VehicleMasterManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: VehicleMasterManagementResponseType
}

export enum VehicleMasterManagementResponseType {
  VehicleCode,
  VehicleType,
  FuelType,
  VehicleRegistrationNumber,
  EngineNumber,
  Id
}

export class AddVehicleMasterManagementAc {
  VehicleCode: string;
  VehicleType: string;
  FuelType: string;
  VehicleRegistrationNumber: string;
  EngineNumber: string;
  ChasisNumber: string;
  AverageKMPL: number;
  InsuranceNumber: string;
  InsuranceDate: Date;
  InsuranceExpDate: Date;
  NextMaintenanceDate: Date;
  PermitValidityDate: Date;
  FitnessExpDate: Date;
  ExtraFittings: string;
}

export class UpdateVehicleMasterManagementAc {
  Id: number;
  VehicleCode: string;
  VehicleType: string;
  FuelType: string;
  VehicleRegistrationNumber: string;
  EngineNumber: string;
  ChasisNumber: string;
  AverageKMPL: number;
  InsuranceNumber: string;
  InsuranceDate: Date;
  InsuranceExpDate: Date;
  NextMaintenanceDate: Date;
  PermitValidityDate: Date;
  FitnessExpDate: Date;
  ExtraFittings: string;
}

export class AddVehicleDocumentMappingAc {
  Name: string;
  ExpiredDate: Date;
  MetaData: string;
  FileType: string;
  File: string;
  FileData: any;
  FileUrl: string;
}