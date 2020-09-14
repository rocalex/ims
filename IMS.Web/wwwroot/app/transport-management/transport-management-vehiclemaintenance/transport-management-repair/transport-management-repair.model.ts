export class AddVehicleRepairManagementAc {
  Code: string;
  RepairDate: Date;
  VehicleId: number;
  RepairCost: number;
  Remarks: string;
}

export class UpdateVehicleRepairManagementAc {
  Id: number;
  Code: string;
  RepairDate: Date;
  VehicleId: number;
  RepairCost: number;
  Remarks: string;
}

export enum VehicleRepairManagementResponseType {
  Code,
  VehicleId,
  ActionTaken,
  Id
}

export class VehicleRepairManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: VehicleRepairManagementResponseType
}