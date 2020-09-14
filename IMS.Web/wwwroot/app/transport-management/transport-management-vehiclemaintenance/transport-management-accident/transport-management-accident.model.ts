export class AddVehicleAccidentManagementAc {
  Code: string;
  AccidentDate: Date;
  VehicleId: number;
  EstimateCost: number;
  DriverId: number;
  Address: string;
}

export class UpdateVehicleAccidentManagementAc {
  Id: number;
  Code: string;
  AccidentDate: Date;
  VehicleId: number;
  EstimateCost: number;
  DriverId: number;
  Address: string;
}

export enum VehicleAccidentManagementResponseType {
  Code,
  VehicleId,
  DriverId,
  Id
}

export class VehicleAccidentManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: VehicleAccidentManagementResponseType
}