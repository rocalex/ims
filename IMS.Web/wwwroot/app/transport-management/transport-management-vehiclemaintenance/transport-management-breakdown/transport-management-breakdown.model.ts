export class AddVehicleBreakDownManagementAc {
  Code: string;
  BreakDownDate: Date;
  VehicleId: number;
  BreakDownDuration: Date;
  DriverId: number;
  Address: string;
}

export class UpdateVehicleBreakDownManagementAc {
  Id: number;
  Code: string;
  BreakDownDate: Date;
  VehicleId: number;
  BreakDownDuration: Date;
  DriverId: number;
  Address: string;
}

export enum VehicleBreakDownManagementResponseType {
  Code,
  VehicleId,
  DriverId,
  Id
}

export class VehicleBreakDownManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: VehicleBreakDownManagementResponseType
}