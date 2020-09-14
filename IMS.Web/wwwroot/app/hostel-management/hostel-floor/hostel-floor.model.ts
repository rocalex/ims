import { RoomTypeModel } from "../lookup/lookup.model";

export class HostelFloor {
  id: number;
  blockId: number;
  floorNo: number;
  roomNo: string;
  roomType: number;
  roomTypeInstance: RoomTypeModel;
  bedAmount: number;
  createdOn: Date;
  status: boolean;
}

export class BedModel {
  id: number;
  roomId: number;
  room: HostelFloor;
  bedNo: string;
  status: number;
}

export class FloorDisplayModel {
  hostelName: string;
  blockName: string;
  blockId: number;
  floorName: string;
  floorNo: number;
}

export class BlockModel {
  id: number;
  name: string;
  hostel: HostelModel;
  floorAmount: number;
}

export class HostelModel {
  id: number;
  name: string;
}