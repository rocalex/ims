export class AddVehicleMaintenanceManagementAc {
  Code: string;
  MaintenanceDate: Date;
  VehicleId: number;
  NextMaintenanceDate: Date;
  MaintenanceDoneBy: string;
  EstimateCost: number;
  ActionTaken: string;
  Remark: string;
}

export class UpdateVehicleMaintenanceManagementAc {
  Id: number;
  Code: string;
  MaintenanceDate: Date;
  VehicleId: number;
  NextMaintenanceDate: Date;
  MaintenanceDoneBy: string;
  EstimateCost: number;
  ActionTaken: string;
  Remark: string;
}

export enum VehicleMaintenanceManagementResponseType {
  Code,
  VehicleId,
  ActionTaken,
  Id
}

export class VehicleMaintenanceManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: VehicleMaintenanceManagementResponseType
}